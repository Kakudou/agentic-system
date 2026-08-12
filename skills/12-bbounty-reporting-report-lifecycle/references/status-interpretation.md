# Status And Timestamp Interpretation

## Purpose

Document observed status changes without treating differing platform labels as equivalent or deriving service-level deadlines.

## Preconditions

- A dated observation with an accountable source locator
- The exact displayed status text, or an explicit note that it was unavailable

## Documentation Method

Store the original status text first. Map it only to the neutral record labels in `../assets/status-confidence-matrix.yaml`: `admitted`, `submitted-observed`, `triage-observed`, `resolution-observed`, `closed-observed`, or `unknown`. Record whether the mapping is direct, contextual, or uncertain. Timestamps are observations: identify their displayed timezone when known; otherwise mark the timezone unknown and record the capture time separately. Never calculate elapsed time as an operational deadline.

## No-Message/No-Submission Boundary

Do not poll for a new status, set reminders, infer a response window, or initiate a follow-up.

## Evidence And Handoff

Handoff includes prior and new observation IDs, exact displayed wording, timestamp provenance, mapping confidence, and a note when no state change is evidenced.

## Sources

- HackerOne, [Hacktivity status glossary](https://docs.hackerone.com/hackers/hacktivity.html)
- Bugcrowd, [Vulnerability Rating Taxonomy](https://bugcrowd.com/vulnerability-rating-taxonomy)
