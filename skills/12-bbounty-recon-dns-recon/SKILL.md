---
name: 12-bbounty-recon-dns-recon
description: Scope-bound DNS observation and ownership correlation for authorized reconnaissance.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized DNS Observation

## Purpose

Build a defensible DNS observation record for an explicitly authorized zone. This skill is reconnaissance only: it does not discover names by guessing, request zone transfers, bypass wildcards, claim services, or test endpoints.

## Prerequisites

- Written program authorization or asset-owner permission.
- Exact in-scope zone names, permitted observation methods, time window, rate limit, and stop contacts.
- A case or engagement identifier and a secure evidence location.

## Decision Flow

1. Confirm the exact zone, authorization boundary, and stop conditions before collecting anything. Record them in the [scope, rate, and stop checklist](assets/scope-rate-stop-checklist.md).
2. Establish the zone's authority context and observe only records allowed by scope. Use the [record and authority observation guide](references/record-enumeration.md) and record results in the [DNS observation and ownership worksheet](assets/dns-observation-ownership-worksheet.md).
3. If an observed response could represent a wildcard or synthesized answer, classify the pattern before treating a name as distinct. See [wildcard and response-pattern interpretation](references/wildcard-detection.md) and the [interpretation matrix](assets/wildcard-delegation-interpretation-matrix.md).
4. If delegation, aliases, mail routing, or hosted-service indicators appear, distinguish zone control from provider operation. Use [delegation and service ownership correlation](references/dangling-records.md).
5. Preserve raw observation context, rule out ordinary DNS behavior, and hand off only corroborated concerns. Follow [evidence and false-positive controls](references/validation-ethics.md), then use the [recon handoff template](assets/recon-handoff-template.md).

## Evidence

Capture the authorization reference, observer and timestamp, fully qualified name, record type, response status, answer and authority context, TTL when available, source of the observation, and the interpretation made. Minimize sensitive record content in reports; retain it only in the authorized evidence location.

## Output

```yaml
dns_observation:
  engagement_id: string
  scope: [fqdn]
  observed_at: RFC-3339 timestamp
  authority_context: string
  observations:
    - name: fqdn
      record_type: string
      response_pattern: string
      ownership_assessment: string
      confidence: low|medium|high
      evidence_ref: string
  limitations: [string]
  handoff: string
```

## Supplemental References

- [DNS record semantics](references/dns-records.md)
- [Passive name-source coverage](references/subdomain-bruteforce.md)
- [Transfer exposure handling](references/zone-transfers.md)
- [Wildcard DNS semantics](references/wildcard-dns.md)
- [Name-pattern scope controls](references/permutations.md)
