---
name: 12-bbounty-webvuln-xxe
description: Authorized, low-impact assessment of XML parsers for unsafe DTD, entity, and XInclude handling, with evidence-led remediation.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# XML External Entity (XXE) Assessment

## Purpose

Assess an explicitly authorized XML-processing surface for unsafe parser behavior without retrieving files, contacting external systems, or attempting resource-exhaustion attacks. Establish parser behavior with harmless markers, preserve evidence, and provide actionable remediation.

## Prerequisites

- Written authorization that names the target, permitted test window, and allowed request rate.
- A known endpoint, upload flow, or integration that processes XML or XML-derived formats.
- A baseline request and a way to retain redacted request/response evidence.
- A stop contact for unexpected errors, latency, or processing changes.

Do not test file access, internal services, callbacks, out-of-band channels, or entity-expansion limits. Do not alter content types outside the authorized interface contract.

## Workflow

1. Confirm scope, baseline behavior, rate limit, and stop contact. Read [evidence and stop conditions](assets/evidence-stop-checklist.md) before sending a probe.
2. Classify the input and parser boundary. For XML, SOAP, SVG, feed, document-upload, or content-type ambiguity, use the [parser and input-format decision matrix](assets/parser-input-decision-matrix.md). Read [basic XXE behavior](references/basic-xxe.md) when DTD or entity handling is in scope.
3. Send one minimal valid baseline, then one semantically equivalent, harmless-marker probe. Keep application values unchanged and do not include external identifiers, paths, URLs, recursive structures, or oversized input. Read [payload and context testing](references/payload-context-testing.md) before adapting the probe to a schema or upload context.
4. Compare status, body, validation error, timing, server-side trace identifier, and downstream result. A parser error alone is not a vulnerability. Use the [validation matrix](assets/validation-matrix.md) to classify the observation and control for gateway or schema effects.
5. If the application appears to parse DTDs but the marker is not observable, stop external testing. Read [blind and out-of-band behavior](references/blind.md) only to document why no callback testing is performed and what evidence a maintainer can validate in a controlled environment.
6. If the processing stack may support XInclude, schema-driven parsing, or XML embedded in another format, read [XInclude and parser behavior](references/xinclude.md). Test only the declared format with a harmless marker and no resource reference.
7. Correlate the observed stack with [prevention guidance](references/prevention.md) and the [secure parser configuration lookup](assets/secure-parser-remediation-lookup.md). Recommend a parser-safe configuration and a regression test.
8. Record a finding only when evidence demonstrates unsafe processing or an authorized maintainer confirms the unsafe configuration. Otherwise report the result as inconclusive or not observed.

## Evidence

- Authorization reference, target, time window, tester, and rate used.
- Redacted baseline and marker-probe requests, including declared content type and upload metadata where applicable.
- Status, normalized response differences, latency, trace IDs, and relevant server or application logs supplied by the owner.
- Parser/library/version evidence when available, plus false-positive controls and classification rationale.
- Remediation recommendation, owner validation result, and proposed regression test.

## Output

```yaml
xxe_report:
  target: string
  authorization: string
  input_context: xml | soap | svg | feed | upload | other
  content_type: string
  parser_evidence: string | unknown
  baseline_and_marker_result: not_observed | inconclusive | unsafe_behavior_confirmed
  false_positive_controls: [string]
  impact: informational | low | medium | high
  remediation: [string]
  stop_conditions_triggered: [string]
```

## Resource Index

- [Basic XXE behavior](references/basic-xxe.md)
- [Blind and out-of-band behavior](references/blind.md)
- [XInclude and parser behavior](references/xinclude.md)
- [Payload and context testing](references/payload-context-testing.md)
- [Prevention](references/prevention.md)
- [XXE assessment cheatsheet](assets/xxe_cheatsheet.md)
- [Parser and input-format decision matrix](assets/parser-input-decision-matrix.md)
- [Evidence and stop conditions](assets/evidence-stop-checklist.md)
- [Validation matrix](assets/validation-matrix.md)
- [Secure parser configuration lookup](assets/secure-parser-remediation-lookup.md)
