---
name: 12-bbounty-webvuln-nosql-injection
description: NoSQL injection testing. MongoDB operators, aggregation pipelines, field projection, type coercion, and regex injection.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# NoSQL Injection Assessment

Assess whether an authorized application turns untrusted input into NoSQL query structure rather than a typed data value. This workflow establishes an evidence-backed finding without bypassing authentication, extracting data, automating requests, or using destructive or high-volume tests.

## Prerequisites

- Written authorization, in-scope target, and applicable program rules.
- A known endpoint, input, and normal expected behavior.
- A non-sensitive test record or test account where available.
- A request budget and an agreed stop path for instability, access-control effects, or unexpected data exposure.

## Workflow

### 1. Establish scope and a baseline

Record the endpoint, method, content type, intended input type, caller role, and a normal response using a non-sensitive test value. Do not test login, password-reset, token, administrative, or other authorization-sensitive inputs unless the engagement explicitly permits it.

Map the request-to-data-model assumptions with the [database and query-model coverage worksheet](assets/database-query-model-coverage-worksheet.md) and review [NoSQL injection basics](references/nosql-basics.md).

### 2. Assess parser and type boundaries

For one input at a time, compare the baseline with a minimal, semantically invalid representation of the same expected value. Observe only validation outcome, response schema, status, stable error category, and server-side audit signal when available. Keep requests manual, low-rate, and within the agreed budget.

Use the [input, type, and operator assessment matrix](assets/input-type-operator-assessment-matrix.md) and read [syntax and parser differentials](references/syntax-injection.md). A parsing error alone is not evidence that a database query is controllable.

### 3. Assess structured query acceptance

Only where the API contract expects a scalar, determine whether it rejects an unexpected structured value before persistence or query construction. Do not submit executable expressions, patterns, aggregation stages, or broad-match conditions. Compare a bounded response property against the baseline and restore the known-good value after each observation.

Read [operator and query behavior](references/operator-injection.md) and the [safe assessment techniques](references/nosql-techniques.md). Treat differences caused by framework deserialization, caching, defaults, or validation order as unconfirmed until controlled.

### 4. Check authorization effects safely

Stop immediately if a test changes session state, object visibility, result cardinality beyond the test record, or any authorization decision. Do not attempt to continue, access another account, enumerate records, or validate an authentication bypass. Preserve the minimal observation and route it through the engagement's finding-validation process.

Use [authorization-effect boundaries](references/nosql-basics.md#authorization-effect-boundaries) and the [evidence and stop-condition checklist](assets/evidence-stop-condition-checklist.md).

### 5. Confirm or reject the hypothesis

Confirm only with a repeatable, low-impact differential on a non-sensitive test record, ideally corroborated by application logs, source review, or a maintainer-approved test environment. Revert to the baseline between attempts. If the observation cannot be reproduced without broad matching, data access, timing manipulation, or an authorization effect, stop and report it as inconclusive.

Follow [safe confirmation and false-positive controls](references/nosql-techniques.md#safe-confirmation) and the [assessment decision matrix](assets/input-type-operator-assessment-matrix.md#decision-matrix).

### 6. Validate fixes and recommend prevention

Verify that the application enforces an explicit input schema, rejects unexpected object and array forms, prevents user-controlled query keys or operators, and applies authorization independently of query construction. Retest only the original bounded differential after a fix.

Read [validation guidance](references/validation.md) and [prevention and remediation](references/prevention.md). Use the [remediation lookup](assets/remediation-lookup.md) to match the defect to an actionable control.

## Evidence and Output

Capture only the minimum necessary request metadata, baseline and differential outcomes, repeatability, role context, relevant sanitized logs, and stop decisions. Never retain credentials, tokens, personal data, or full sensitive response bodies.

Use the [evidence and stop-condition checklist](assets/evidence-stop-condition-checklist.md) before reporting. A report should state the input contract, observed parser/query boundary, controls used to exclude false positives, impact limited to demonstrated behavior, and the recommended remediation.

## Resources

- [Database and query-model coverage worksheet](assets/database-query-model-coverage-worksheet.md)
- [Input, type, and operator assessment matrix](assets/input-type-operator-assessment-matrix.md)
- [Evidence and stop-condition checklist](assets/evidence-stop-condition-checklist.md)
- [Remediation lookup](assets/remediation-lookup.md)
- [NoSQL injection basics](references/nosql-basics.md)
- [Syntax and parser differentials](references/syntax-injection.md)
- [Operator and query behavior](references/operator-injection.md)
- [Database-specific considerations](references/mongodb.md)
- [Safe assessment techniques](references/nosql-techniques.md)
- [Bounded assessment cases](references/nosql-payloads.md)
- [Validation guidance](references/validation.md)
- [Prevention and remediation](references/prevention.md)
