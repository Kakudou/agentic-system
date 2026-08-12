# XXE Validation Matrix

## Purpose and Preconditions

Use after a single baseline/marker comparison to classify evidence without escalating test impact. You need redacted captures, declared content type, timing, and any owner-provided parser telemetry.

| Evidence state | Interpretation | False-positive control | Authorized next step | Remediation direction |
|---|---|---|---|---|
| Declaration rejected and logs show parser policy block | Safe behavior observed at this boundary. | Confirm same response is not WAF-generated. | Document and test remaining distinct parser boundaries. | Preserve policy with regression coverage. |
| Generic 4xx/5xx, no parser evidence | Inconclusive. | Compare schema and gateway validation with size-matched baseline. | Stop after one control comparison; request logs. | None until parser path is known. |
| Marker deterministically processed or logs show DTD/XInclude handling | Unsafe feature exposure or configuration concern. | Confirm owner log correlation and parser/version. | Stop active probing; perform configuration review. | Disable DTD/external resolution and unused XInclude. |
| Accepted upload, no processing evidence | Storage acceptance only. | Obtain converter/job evidence. | Do not infer parser behavior; request staging verification. | Harden confirmed converter boundary. |
| Timeout, delayed job, or queue change | Inconclusive and potentially unsafe operational impact. | Rule out queue congestion and unrelated retries. | Stop and notify owner. | Add resource limits and observability after review. |
| Owner staging test shows resolver invocation | Unsafe behavior confirmed in controlled environment. | Confirm test fixture was harmless and isolated. | No production reproduction needed. | Disable resolver; add no-invocation regression test. |

## Parser and Content-Type Notes

Apply this matrix separately to XML APIs, SOAP, SVG, feeds, document processors, and background workers. Header values, file extensions, and URL paths do not prove the same parser was used.

## Safe Method, Evidence, Limits, and Remediation

Use only the single baseline/marker comparison described by the parent skill; do not generate a stronger signal through retrieval, network interaction, or expansion abuse. Include authorization, requests, normalized results, trace IDs, logs, controls, and remediation owner. For confirmed exposure, disable the unsafe feature, test with a harmless marker, and verify that resolver activity is absent.

PortSwigger: <https://portswigger.net/web-security/xxe>
