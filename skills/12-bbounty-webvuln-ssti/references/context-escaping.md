# Context and Escaping Interpretation

## Purpose and Preconditions

Interpret rendering and encoding observations without changing template structure. Begin only after input mapping and an authorized baseline.

## Inert and Bounded Methodology

Use a plain-text sentinel containing characters relevant to the observed output context. Compare raw response bytes, response headers, and rendered output when permitted. Use the [worksheet](../assets/engine-context-classification-worksheet.md) to record transformations. Do not use syntax that forms an expression or directive.

## Observations and Interpretation

Correct context-aware encoding usually indicates that characters are being rendered as data, but it does not prove template source safety. Missing encoding can indicate another injection class and should be reported separately, not conflated with SSTI.

## False-Positive Controls

Distinguish server transforms from browser DOM changes; check response charset and double encoding; compare a matched control field; and account for sanitizers and proxy normalization.

## Stop Conditions

Stop if a test would break markup, execute client-side behavior, alter a stored record, or cause content to be delivered to another user.

## Evidence

Record source and rendered comparisons, encoding observations, context classification, and any uncertainty.

## Remediation

Apply output encoding appropriate to each final sink and retain the stronger control: user input must never select or construct template source.

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
