# Application Navigation and Content Classification

## Purpose and Preconditions

Classify content reached through normal, authorized application navigation without treating it as a security finding. Require an in-scope entry point, an approved browsing context, and a known handling rule for potentially sensitive content.

## Passive or Approved Low-Impact Methodology

Follow only user-visible navigation, explicitly referenced resources, and already-approved passive-source locators. Record the source page, visible relationship, effective locator, coarse response characteristics, and purpose. Classify only what is directly observable: navigation, public document, static asset, metadata signal, or unknown. Do not derive names, recurse through unapproved links, or retrieve resources merely because they may exist.

## Interpretation

Navigation may reveal product areas, documentation, support material, or public media. A static resource may support later technology or exposure review, but it does not establish ownership, sensitivity, or exploitability. Use `unknown` when content purpose cannot be established from permitted evidence.

## False-Positive and Scope Controls

Do not classify a login page, error page, CDN response, cache variant, translated content, or third-party embed as an exposed application function without target-specific corroboration. Preserve differences in host, account state, locale, time, and client context. Avoid collecting full documents when a title, content type, and redacted excerpt are sufficient.

## Evidence and Handoff

Capture the source relationship, classification rationale, collection conditions, and minimal redacted evidence. Use the [content-observation worksheet](../assets/content-observation-worksheet.md). Hand off unclassified, sensitive, or ownership-ambiguous content for review; do not escalate it as a vulnerability.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [W3C Web Application Security](https://www.w3.org/Security/)
