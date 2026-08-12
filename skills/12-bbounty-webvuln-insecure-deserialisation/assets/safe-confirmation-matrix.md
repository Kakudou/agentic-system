# Safe Confirmation Matrix

## Purpose

Select the least invasive corroboration permitted by written scope.

| Question | Permitted evidence | Supports | Does not prove |
|---|---|---|---|
| Is an input accepted? | Existing request documentation or approved logs | Input boundary | Runtime deserialization |
| What format is expected? | Contract, content type, schema, or source configuration | Format classification | Unsafe type activation |
| Is a typed binder configured? | Source review or owner confirmation | Boundary review priority | Exploitability or impact |
| Is validation before binding? | Source/control-flow review or test record supplied by owner | Defensive control | Complete coverage |
| Is integrity checked before handling? | Design review, configuration, or owner evidence | Integrity-control presence | Semantic safety |
| Did behavior change? | Existing approved telemetry or owner-run test result | Reproducible observation | Cause or security impact |

## Decision Rule

Classify a concern only when two independent evidence sources agree, or mark it `owner_review_required`. Never substitute an active test for missing evidence.
