# Authentication Boundaries

## Purpose and Preconditions

Use this reference whenever a route presents a login boundary, identity-provider redirect, account context, token, cookie, or role-specific content. This skill does not authorize authenticated observation. Proceed only under a separate written test plan that identifies approved accounts, roles, routes, limits, data handling, and emergency contact.

## Low-Impact Methodology

For this skill, record only the visible presence and destination class of authentication boundaries. Do not initiate login, replay sessions, store credentials, or compare authenticated and anonymous responses. Hand the requirement to the authorized engagement owner for a dedicated plan.

## Observations and Interpretation

- A login page, redirect, or `401`/`403` response demonstrates an access boundary, not an authorization flaw.
- Session identifiers, tokens, authorization headers, and anti-forgery values are sensitive and must not appear in recon notes or evidence.
- Identity-provider and federation redirects often leave the approved host boundary; treat them as out of scope unless explicitly listed.
- Role-specific claims require a documented account and authorization model, not inference from UI labels.

## State-Change Avoidance

Do not sign in or out, create or recover accounts, consent to access, replay cookies or tokens, refresh credentials, alter profile settings, or inspect authenticated data. Immediately stop and notify the owner if sensitive values are exposed in a capture.

## Limits, Evidence, and Handoff

Record only the public route, boundary signal, destination classification, timestamp, and redacted evidence. Remove or securely report accidental secret exposure through the approved incident channel. See [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) and [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html).
