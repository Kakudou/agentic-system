# Safe Confirmation

## Purpose and Preconditions

Confirm a suspected parser boundary with a single inert marker after authorization, baseline capture, input mapping, and context review. The goal is to distinguish controlled parsing evidence from ordinary reflection, not to enumerate template capabilities.

## Inert and Bounded Methodology

Select one approved non-executing marker class in the [decision matrix](../assets/harmless-confirmation-decision-matrix.md). Use a unique correlation token outside any syntax-shaped portion. Submit it once through the approved input and once as a plain-text control. Preserve method, headers, account, and all unrelated parameters. Do not use expressions, variables, object paths, helpers, filters, template directives, or syntax designed to cause errors.

## Observations and Interpretation

Classify the result as literal reflection, escaped reflection, suspected interpretation, confirmed inert interpretation, or inconclusive. Confirmation requires a repeatable change attributable to the inert marker and not explained by encoding, validation, caching, or client-side rendering. It does not establish data exposure or execution.

## False-Positive Controls

Compare normalized response bodies and status codes, inspect the delivered source separately from browser DOM when permitted, vary only the correlation token, and verify the same result after cache expiry or a cache-busting control accepted by the program.

## Stop Conditions

Stop after one confirmation attempt per marker class, or immediately on errors, throttling, unexpected response growth, sensitive material, or state changes. Do not progress to context discovery or capability testing.

## Evidence

Capture redacted requests and responses, marker/control relationship, response diff summary, reproducibility, and why alternative explanations were rejected or retained.

## Remediation

Render only trusted, precompiled templates; bind user values as data; validate input according to business rules; and encode output for the final context. See [prevention](prevention.md).

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
- PortSwigger, [Identifying SSTI](https://portswigger.net/web-security/server-side-template-injection#how-does-server-side-template-injection-arise)
