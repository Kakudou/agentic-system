# Confidence And Validation Limits

## Purpose

Assign a transparent confidence level from supplied evidence and define when analysis must stop rather than seek confirmation.

## Preconditions

- A change classification with cited baseline and comparison records.
- Known scope and evidence-handling conditions.

## Evidence-Led Method

Set confidence to `high` when comparable, well-provenanced records directly support the same difference and existing supplied corroboration agrees. Set `medium` for directly supported but limited or partially confounded differences. Set `low` for a plausible difference with material coverage, timing, or identity limitations. Set `insufficient` when the evidence cannot support a conclusion. Confidence describes the evidence, not severity or likelihood of a vulnerability.

## Interpretation And Attribution Controls

Do not upgrade confidence because a result is interesting, familiar, or consistent with a hypothesis. Conflicting sources, dynamic content, CDN behavior, authentication state, sampling differences, and stale records lower confidence or require an inconclusive result. No active recheck is part of this skill.

## Privacy And Scope Limits

Do not request or retain sensitive content merely to increase confidence. Stop when validation would require new interaction, cross a scope boundary, or depend on an unverified ownership relationship.

## Evidence And Handoff

Record the confidence basis, conflicting evidence, limitations, and the specific decision needed. A separate validation activity requires separate authorization; this analysis does not provide it.

## Sources

- [NIST SP 800-30 Rev. 1: Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
