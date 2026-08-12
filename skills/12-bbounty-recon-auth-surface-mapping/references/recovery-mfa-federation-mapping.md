# Recovery, MFA, And Federation Mapping

## Purpose

Document the visible recovery, multi-factor, and federated sign-in surfaces and their stated transitions.

## Preconditions

- Written authorization permits the relevant page observation.
- The observer will not trigger delivery, enrollment, challenge, consent, or third-party login actions.

## Method

Record visible recovery links, stated recovery channels, MFA method names, enrollment or management labels, and named federation providers. For a supplied test account, observe its standard settings UI only when expressly approved. Treat a redirect, consent page, challenge prompt, or external tenant as a boundary and stop unless that exact step is authorized.

## Interpretation And Controls

Visible terminology is not proof that a method is enabled, required, or correctly configured. Separate "advertised", "observed for supplied account", and "not observed". Do not request recovery messages, scan QR codes, enter one-time codes, approve prompts, or alter MFA settings.

## Privacy, Evidence, And Handoff

Do not retain recovery addresses, phone numbers, QR codes, backup codes, authorization parameters, assertions, or tokens. Report provider and method labels at a category level. Escalate unexpected access to identity-provider content or another user's data immediately.

## Sources

- [PortSwigger: OAuth authentication](https://portswigger.net/web-security/oauth)
- [OWASP Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
