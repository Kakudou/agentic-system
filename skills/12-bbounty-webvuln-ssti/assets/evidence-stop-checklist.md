# Evidence and Stop Checklist

## Capture Before Testing

- [ ] Authorization covers target, route, method, account, and low-impact testing.
- [ ] Baseline request and plain-text control are saved with secrets removed.
- [ ] Input location and response context are classified.
- [ ] Rate and retry limits are recorded.

## Capture After an Observation

- [ ] Redacted baseline, control, and inert-marker request/response pairs.
- [ ] Timestamp, status, relevant headers, and response-delta summary.
- [ ] Rendering and encoding interpretation.
- [ ] False-positive controls and repeatability result.
- [ ] Explicit observed-versus-potential impact boundary.
- [ ] Recommended prevention and regression criterion.

## Stop Immediately

- [ ] Scope is unclear or authorization expires.
- [ ] Sensitive data, credentials, tokens, or another user's content appears.
- [ ] A request changes state, triggers outbound communication, or becomes persistent.
- [ ] Error rate rises, the service becomes unstable, or throttling/WAF signals appear.
- [ ] Further explanation would require data access, environment inspection, object traversal, file access, command execution, or code execution.

## Redaction Rule

Keep only the minimum proof needed to reproduce the inert observation. Replace secrets and personal data with typed placeholders; never include raw session material.
