# Evidence-Based DBMS Detection

DBMS identification helps select syntactically valid, low-impact confirmation methods. It is not an objective by itself and should never be based on a single response.

## Evidence ladder

Start with passive evidence: documented platform details, response headers, framework error classes, or an existing redacted stack trace. Next, compare harmless syntax that differs among database families, such as comment behavior, required `FROM` clauses, concatenation, or a version function placed in a previously verified display channel. Finally, cross-check with metadata-view behavior if scope permits.

Record each observation as supported, contradicted, or inconclusive. For example, `@@version` is associated with both SQL Server and MySQL, so it distinguishes neither alone. `version()` supports PostgreSQL when its output is visible, but a generic failure might also be caused by query context or filtering. Oracle's `dual` requirement and its catalog views are useful only after query shape is known.

## Cautious procedure

1. Keep request context fixed and establish a baseline.
2. Try one narrow candidate-specific syntax change with a paired control.
3. Repeat any apparent signal.
4. Seek an independent corroborator: version-format evidence, another syntax distinction, or metadata behavior.
5. Label the result as confirmed only when evidence converges; otherwise state the most likely family and uncertainty.

## Version disclosure and remediation

Version output can reveal patch and platform details. Collect only the minimum needed to identify the family, redact it in reports when unnecessary, and avoid treating an old-looking banner as proof of exploitability. The SQLi fix remains parameterization and safe dynamic-identifier design; generic client errors reduce passive fingerprinting but do not remove injection.

## Sources

- https://portswigger.net/web-security/sql-injection/examining-the-database
- https://portswigger.net/web-security/sql-injection/cheat-sheet
