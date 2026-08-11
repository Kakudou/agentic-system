ADMIN_KEY="sk-mem-$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 32)"
echo "$ADMIN_KEY"

curl -sS \
  -X POST http://127.0.0.1:8420/v3/internal/meta/user/init-admin \
  -H 'Content-Type: application/json' \
  -H 'x-tdai-service-id: default' \
  -H "Authorization: Bearer ${TDAI_GATEWAY_API_KEY}" \
  -d "$(jq -nc \
        --arg username admin \
        --arg key "$ADMIN_KEY" \
        '{username:$username,user_key:$key}')" \
  | jq

printf '%s' "$ADMIN_KEY" > ./data/.admin-key
chmod 600 .admin-key

curl -sS \
  -X POST http://127.0.0.1:8420/v3/meta/auth/verify \
  -H 'Content-Type: application/json' \
  -H 'x-tdai-service-id: default' \
  -H "Authorization: Bearer ${TDAI_GATEWAY_API_KEY}" \
  -d "$(jq -nc \
        --arg key "$ADMIN_KEY" \
        '{user_key:$key}')" \
  | jq
