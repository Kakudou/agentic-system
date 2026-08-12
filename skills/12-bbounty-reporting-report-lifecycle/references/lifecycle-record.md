# Lifecycle Records

## Purpose

Create a durable, static account of what was observed about one admitted report without asserting platform facts beyond the evidence.

## Preconditions

- Complete admission evidence under [report admission](report-admission.md)
- An approved record location and a stable local record ID

## Documentation Method

Start from `../assets/lifecycle-record.yaml`. Keep one record per admitted report. Add observations as append-only entries containing the observed platform wording, observation timestamp, source locator, evidence class, and redaction note. Maintain `current_status` as a separately labeled interpretation. Use `unknown` rather than placeholders, and preserve original status text when normalization is uncertain.

## No-Message/No-Submission Boundary

The record is not a platform form, queue, reminder, or action log. It must not contain send instructions, credentials, API requests, or automatic deadlines.

## Evidence And Handoff

Each change must cite its source. A reviewer receives the record, the newest observation, unresolved fields, and the handoff template.

## Sources

- ISO/IEC 29147:2018, *Vulnerability disclosure*
- FIRST, [Vulnerability Coordination Maturity Model](https://www.first.org/vcmm/)
