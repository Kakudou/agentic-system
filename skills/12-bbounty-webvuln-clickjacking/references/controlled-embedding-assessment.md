# Controlled Same-Account Embedding Assessment

## Purpose and Preconditions

Use only after policy inventory identifies a potentially framable in-scope HTML page. Written authorization must name the permitted parent context, and the account must contain only harmless test data.

## Safe Bounded Methodology

In a clean browser profile, use an approved same-account parent context or an existing sanctioned product embed to observe whether the selected child page renders or is blocked. Do not construct proof pages, conceal the target UI, adjust layout, enter data, click controls, or progress an action flow. Record only the browser's visible block/render condition.

## Observations and Interpretation

Successful rendering establishes browser framability for the observed parent and session state. Blocking supports effective policy enforcement. Either result is limited to the tested browser, response, parent context, and account state. It does not establish user deception or action completion.

## False-Positive Controls

Confirm the final response URL, parent origin, clean-profile state, logged-in state label, and whether a browser extension, cached response, or sanctioned embed influenced the result. Compare policy headers with the browser result.

## Cleanup and Stop Conditions

Close the parent and child tabs, clear transient test data, and stop immediately before any interactive control, consent screen, MFA prompt, or unexpected content.

## Evidence and Remediation

Capture redacted browser/version details, final URL, parent-origin label, render/block result, and corresponding headers. Limit parent origins with enforced `frame-ancestors`; do not rely solely on client-side frame-busting code.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
