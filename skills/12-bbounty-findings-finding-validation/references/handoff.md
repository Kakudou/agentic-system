# Handoff

## Purpose

Transfer a bounded validation packet to an authorized recipient without converting it into a severity decision, remediation instruction, public disclosure, or permission for further testing.

## Preconditions

- Completed admission, scope, claim-boundary, and redaction assessments.
- Named recipient, approved channel, and evidence-access path.

## Bounded Documentation Method

1. Use the handoff template to identify the finding, decision, scope basis, and evidence IDs.
2. Present observed facts first, then confidence, uncertainty, alternative explanations, and the impact boundary.
3. State one decision: hand off for authorized review, hold pending clarification, or close with reason.
4. Name any unanswered question and the owner authorized to resolve it. Do not prescribe active validation steps.

## Interpretation And Uncertainty

Handoff means the recipient may review the packet; it does not mean acceptance, triage, severity, bounty eligibility, or remediation approval. A hold or closure can be the correct evidence-led outcome.

## False-Positive And Privacy Controls

- Do not include unsupported exploit narratives, severity labels, or claims about broader impact.
- Send sensitive originals only through the approved channel and reference them elsewhere.
- Do not expose duplicate-report details or other reporters' information.

## Evidence And Handoff

Include the completed worksheet, confidence matrix, redaction checklist, and source locators. Record receipt only if it is actually provided; absence of receipt is unknown, not rejection.

## Sources

- [ISO/IEC 29147:2018 Vulnerability Disclosure](https://www.iso.org/standard/72311.html)
- [CISA Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy)
