# Interpretation Matrix

| Observation | Security relevance to establish | Benign explanations to exclude | Safe next action |
| --- | --- | --- | --- |
| HTTP entry does not reach expected HTTPS destination | Sensitive traffic or session could be exposed | Out-of-scope host, maintenance route, proxy behavior | Recheck normal navigation; escalate if uncertain |
| Security policy absent or differs by route | A browser trust boundary is unprotected on applicable content | Route does not render active content; control supplied elsewhere | Compare a representative normal route |
| Report-only policy message | Intended policy would block risky behavior when enforced | Staged rollout, extension, unsupported browser | Record as posture evidence, not enforcement |
| Declared media type differs from browser treatment | The mismatch changes execution, framing, or sensitive handling | CDN transformation, download disposition, browser version | Capture normal browser and response evidence |
| Cache or referrer behavior is unexpected | Sensitive data can persist or disclose across the relevant boundary | Public content, user configuration, intermediary cache | Confirm with the same authorized context |
| Browser rendering differs between clients | A supported client has a material trust-boundary difference | Unsupported version, extension, locale, feature flag | Reproduce with documented supported clients |
