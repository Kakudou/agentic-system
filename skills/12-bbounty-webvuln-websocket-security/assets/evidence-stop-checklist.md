# WebSocket Evidence and Stop Checklist

## Before

- [ ] Written scope covers the endpoint and technique.
- [ ] Dedicated test account and test-owned data are confirmed.
- [ ] Rate limits, data-handling rules, and stop contact are recorded.
- [ ] Harmless, reversible action or marker is selected.

## During

- [ ] Normal baseline was observed first.
- [ ] Only normal UI actions or observation were used.
- [ ] Handshake facts are sanitized: no cookies, tokens, keys, or personal data.
- [ ] Message facts are minimized to type, correlation, expected result, and observed result.
- [ ] No other account, role, tenant, recipient, or integration was involved.

## Stop Immediately

- [ ] Third-party or sensitive data appears.
- [ ] Validation would require altered headers, forged messages, replay, cross-site activity, or automation.
- [ ] The action could notify another user, create an irreversible effect, or exceed rate limits.
- [ ] Authorization, scope, or safe cleanup is no longer certain.

## Closeout

- [ ] Marker was removed through normal application flow, or was not persisted.
- [ ] Test connection was closed.
- [ ] Evidence is redacted and stored under engagement handling rules.
- [ ] Report states demonstrated behavior, limitations, and untested impact.
