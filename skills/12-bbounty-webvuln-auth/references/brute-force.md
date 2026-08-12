# Brute-Force and Rate-Limit Safeguards

## Purpose

Assess whether login, MFA, reset, and recovery endpoints resist repeated failures without risking account availability.

## Preconditions

- Written authorization defines the maximum attempts, rate, concurrency, and test accounts.
- Use only synthetic invalid inputs against controlled accounts. Never credential-stuff, use breach data, rotate identities, or attempt rate-limit evasion.

## Authorized Assessment Workflow

1. Record the program-approved attempt budget and stop conditions in the test plan.
2. Establish a normal failed-authentication baseline with one controlled invalid input.
3. Send only the minimum sequential failures allowed to observe a documented throttle, delay, lockout, CAPTCHA, or risk challenge.
4. Stop immediately when any safeguard appears; verify the controlled account can recover through the documented path.
5. Compare enforcement across password, MFA, reset, and recovery endpoints only when separately authorized.

## Observations and Interpretation

No observable protection within the approved test budget, inconsistent protection across equivalent paths, or a lockout that creates denial-of-service risk may be relevant. Absence of a lockout alone is not proof of missing backend detection.

## False-Positive Controls

Distinguish WAF/CDN responses, network errors, and account-specific risk scoring from application controls. Do not treat a response difference as bypass evidence.

## Remediation

Use layered, account-aware and risk-based throttling; limit MFA and recovery attempts; notify on suspicious activity; avoid easily weaponized permanent lockouts; monitor and respond server-side.

## Sources

- [PortSwigger: Brute-forcing passwords](https://portswigger.net/web-security/authentication/password-based#brute-forcing-passwords)
- [OWASP Blocking Brute Force Attacks](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)
