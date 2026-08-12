# Prevention

## Purpose and Preconditions

Provide remediation that removes the cause of SSTI rather than relying only on output encoding. Use after a suspected or confirmed assessment result.

## Inert and Bounded Methodology

Review the rendering design with the owner: locate where templates are selected or compiled, identify untrusted inputs, and verify data binding. Do not request production secrets or alter configuration. Use [remediation lookup](../assets/remediation-lookup.md) to select controls.

## Observations and Interpretation

The primary defect is untrusted data becoming template source or selecting template behavior. Escaping addresses output contexts but does not make dynamic template construction safe. Sandbox and process isolation reduce blast radius but are secondary controls.

## False-Positive Controls

Confirm the value is not already bound as data to a fixed template. Distinguish template source construction from ordinary presentation bugs or client-side injection.

## Stop Conditions

Stop at recommendations when no owner-approved code review or change window exists. Do not apply configuration changes through this skill.

## Evidence

Reference affected flow, recommended design change, regression-test objective, owner constraints, and validation plan.

## Remediation

Use fixed, reviewed templates; bind typed data; allowlist template selection; disable debug features; minimize template context and helper exposure; sandbox where supported; run the renderer with least privilege; and test that syntax-shaped input is rendered literally.

## Sources

- PortSwigger, [Preventing SSTI](https://portswigger.net/web-security/server-side-template-injection#how-to-prevent-server-side-template-injection)
