#!/usr/bin/env bash
# Initialise the TencentDB memory-core admin user key, store it in
# .admin-key next to this script (mode 0600), then verify it.
#
# Required env:  TDAI_GATEWAY_API_KEY
# Optional env:  TDAI_GATEWAY_URL (default http://127.0.0.1:8420)
#
# The generated key is never printed and never passed on a command line.
set -euo pipefail
umask 077

die() { printf 'error: %s\n' "$*" >&2; exit 1; }

for cmd in openssl curl jq; do
  command -v "$cmd" >/dev/null 2>&1 || die "required command '$cmd' not found"
done

: "${TDAI_GATEWAY_API_KEY:?TDAI_GATEWAY_API_KEY is required}"
case "$TDAI_GATEWAY_API_KEY" in
  *$'\n'* | *$'\r'*) die "TDAI_GATEWAY_API_KEY must be a single line" ;;
esac
GATEWAY_URL="${TDAI_GATEWAY_URL:-http://127.0.0.1:8420}"
GATEWAY_URL="${GATEWAY_URL%/}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="$SCRIPT_DIR/.admin-key"
[ -e "$TARGET" ] && die "$TARGET already exists; refusing to overwrite it"

# --fail-with-body needs curl >= 7.76; fall back to --fail on older curl.
CURL_VERSION="$(curl --version | awk 'NR==1 {print $2}')"
if [ "$(printf '%s\n%s\n' 7.76.0 "$CURL_VERSION" | sort -V | head -n1)" = "7.76.0" ]; then
  CURL_FAIL=(--fail-with-body)
else
  CURL_FAIL=(--fail)
  printf 'note: curl %s < 7.76, using --fail (error bodies are not shown)\n' "$CURL_VERSION" >&2
fi

KEY_TMP=""
WORK=""
cleanup() {
  if [ -n "$KEY_TMP" ]; then rm -f -- "$KEY_TMP"; fi
  if [ -n "$WORK" ]; then rm -rf -- "$WORK"; fi
}
trap cleanup EXIT
trap 'exit 130' INT TERM

KEY_TMP="$(mktemp "$SCRIPT_DIR/.admin-key.tmp.XXXXXX")"
WORK="$(mktemp -d)"
HEADERS="$WORK/headers"
BODY="$WORK/body.json"
RESPONSE="$WORK/response"

RAND="$(openssl rand -hex 32)"
[ "${#RAND}" -ge 32 ] || die "generated key is too short"
ADMIN_KEY="sk-mem-$RAND"
unset RAND
printf %s "$ADMIN_KEY" > "$KEY_TMP"
unset ADMIN_KEY

# Auth header goes through a 0600 file, not argv.
printf 'Authorization: Bearer %s\n' "$TDAI_GATEWAY_API_KEY" > "$HEADERS"

# Print a response with any key/token/secret-looking fields redacted.
show_response() {
  jq 'walk(if type == "object" then with_entries(if (.key | test("key|token|secret|password"; "i")) then .value = "[REDACTED]" else . end) else . end)' \
    "$RESPONSE" 2>/dev/null || printf '(non-JSON response suppressed)\n'
}

post() {
  # $1 = path; body is read from $BODY.
  curl -sS "${CURL_FAIL[@]}" \
    -X POST "$GATEWAY_URL$1" \
    -H 'Content-Type: application/json' \
    -H 'x-tdai-service-id: default' \
    -H @"$HEADERS" \
    --data-binary @"$BODY" \
    -o "$RESPONSE"
}

# 1. Create the admin user with the new key.
jq -n --rawfile key "$KEY_TMP" '{username: "admin", user_key: $key}' > "$BODY"
if ! post /v3/internal/meta/user/init-admin; then
  show_response >&2
  die "init-admin request failed; no key file written"
fi
show_response

# 2. Persist the key only after the gateway accepted it.
[ -e "$TARGET" ] && die "$TARGET appeared during setup; refusing to overwrite it"
mv -- "$KEY_TMP" "$TARGET"
KEY_TMP=""
chmod 600 "$TARGET"
printf 'admin key written to %s\n' "$TARGET"

# 3. Verify the stored key against the gateway.
jq -n --rawfile key "$TARGET" '{user_key: $key}' > "$BODY"
if ! post /v3/meta/auth/verify; then
  show_response >&2
  die "key verification failed (key kept at $TARGET)"
fi
show_response
