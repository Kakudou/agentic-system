# Uncertainty And Bias Controls

## Purpose

Keep review order proportionate to what is observed, while identifying uncertainty, safety constraints, and reviewer bias. This reference does not adjust a score or predict risk.

## Preconditions

- An admitted hypothesis with evidence references.
- Written scope and a named planning owner.

## Evidence-Led Method

For each item, record: evidence freshness, source independence, assumptions, required permissions, possible state changes, and a condition that would stop review. Move an item to `defer` when material facts cannot be checked safely or within scope.

Use a short challenge pass:

- What observation would contradict this hypothesis?
- Which conclusion relies on one source or a reviewer preference?
- Does a familiar vulnerability label replace asset-specific evidence?
- Does the proposed work require data, access, load, or state changes not explicitly authorized?

## Interpretation And Controls

- Do not treat confidence as probability. It describes evidence completeness and consistency only.
- Counter anchoring by reviewing evidence before labels and by comparing alternatives with the same indicators.
- Counter confirmation bias by recording disconfirming observations and unresolved alternatives.
- Disclose personal, commercial, or prior-reporting conflicts; obtain independent review or defer where impartiality is not possible.

## Scope And Privacy

Do not compensate for uncertainty with broader probing, repeated requests, production load, or attempts to access data. Follow program rate, account, and data restrictions.

## Evidence And Handoff

Attach uncertainty notes, conflicts, stop conditions, and any request for clarification to the planning handoff.

## Sources

- [NIST SP 800-30 Rev. 1, Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [CISA, Vulnerability Disclosure Policy Platform](https://www.cisa.gov/vulnerability-disclosure-policy-platform)
