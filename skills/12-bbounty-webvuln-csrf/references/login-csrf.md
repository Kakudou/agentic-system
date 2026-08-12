# Login CSRF

## Purpose and Preconditions

Use only with explicit program authorization, a separate dedicated test account, and a plan that avoids replacing another active session. Login CSRF concerns unintended session binding, not credential collection or account access.

## Safe Assessment

1. Document the normal login flow, session establishment, token requirements, and post-login identity indicator using the dedicated account.
2. Make only the smallest permitted comparison for missing request-integrity protection or session binding.
3. Confirm the resulting authenticated identity through harmless account metadata, then immediately end the controlled session.
4. Do not test recovery, SSO, MFA, or external identity providers unless separately authorized.

## Interpretation and Controls

Absence of a login-form token alone is not proof. Some flows intentionally allow cross-site identity-provider returns, require user interaction, bind state through OAuth/OIDC parameters, or renew sessions safely. Report only if a browser-relevant request can unintentionally bind a controlled session and produces a meaningful security consequence.

## Evidence and Remediation

Capture redacted flow metadata, identity indicator, browser conditions, and logout/cleanup evidence. Apply appropriate request-integrity validation to password login where compatible, bind login state to the initiating session, and clearly distinguish federated callback protections.

Sources: [PortSwigger Academy: CSRF](https://portswigger.net/web-security/csrf), [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
