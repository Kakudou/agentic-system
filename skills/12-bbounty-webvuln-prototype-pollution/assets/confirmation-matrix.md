# Confirmation Matrix

Select the lowest-risk option that is explicitly authorized. If no option qualifies, stop and request program review.

| Candidate evidence | Authorized confirmation | Required controls | Acceptable conclusion | Do not do |
| --- | --- | --- | --- | --- |
| Documentation or library presence only | Source review or maintainer clarification | Scope verification; version evidence | Review candidate only | Infer a vulnerability |
| Ordinary input is loosely accepted | Baseline versus inert ordinary-field comparison | Isolated test state; clean repeat | Input-validation concern or review candidate | Use prototype-oriented names |
| Mapped path has unexpected benign behavior | Program-provided telemetry or isolated test environment | Written approval; one path; reversible state | Bounded handling defect if reproduced | Test persistence, gadgets, or impact |
| Shared or sensitive boundary is implicated | Stop and escalate to program | Preserve redacted evidence | Needs program review | Cross-user, data, or execution testing |

Record the selected row, authorization reference, tester, date, controls, and outcome with the assessment evidence.
