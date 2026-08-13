---
name: 12-bbounty-webvuln-sql-injection
description: "Assess an authorized web input for SQL injection using low-impact differential evidence. Establish a stable baseline, confirm SQL-dependent behavior with harmless controls, identify the likely injection class when useful, stop at minimum necessary proof, and document remediation without retrieving application data."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# SQL Injection Assessment

Assess whether an in-scope input can alter a backend SQL query.

The objective is a defensible finding, not database exploration.

## Preconditions

Require:

- an explicitly authorized target and input;
- the current engagement limits for request rate and sensitive data;
- a reproducible baseline request;
- a clear stop condition.

If scope is ambiguous, stop before active testing.

## Workflow

### 1. Establish a Baseline

Capture repeated normal requests using the same session, method, and input shape.

Record only the response properties needed for comparison, such as:

- status;
- stable body markers;
- response shape or length;
- redirect behavior;
- latency range.

Normalize obvious dynamic content before comparison.

### 2. Look for SQL-Dependent Behavior

Change one input characteristic at a time.

Use paired controls so an application error, WAF response, cache variation, or network jitter is not mistaken for SQL execution.

Read [detection and false-positive controls](references/detection.md).

### 3. Confirm with the Least Invasive Oracle

Choose the smallest confirmation method supported by the observed behavior:

- **error differential** — a repeatable SQL-relevant parser/type error differs from ordinary malformed input;
- **boolean differential** — controlled true/false conditions produce a stable, repeatable response difference;
- **visible harmless marker** — a non-sensitive constant is rendered only through the suspected query path;
- **timing differential** — only when no safer oracle exists, after measuring baseline variance and using a conservative bounded delay.

Use [the validation matrix](assets/sqli_validation_matrix.md) to keep controls and stop conditions explicit.

Read only the reference matching the chosen oracle:

- [error-based confirmation](references/error-based.md)
- [boolean differential confirmation](references/blind-boolean.md)
- [timing differential confirmation](references/blind-time.md)

Do not combine techniques merely to make the finding look stronger.

### 4. Characterize Only What Matters

When DBMS family materially affects remediation or confidence, infer it from already-observed syntax/error/function behavior and corroborate it with one harmless indicator.

Read [evidence-based DBMS identification](references/dbms-detection.md).

Do not enumerate schemas, table names, credentials, personal data, secrets, files, or arbitrary database records as part of this skill.

### 5. Stop at Minimum Necessary Proof

A useful confirmation normally needs:

- the affected endpoint/input;
- a normal baseline;
- a matched control;
- a reproducible SQL-dependent observation;
- the request context needed to reproduce safely.

Stop immediately on:

- unexpected sensitive data;
- state-changing behavior;
- service instability;
- rate limiting;
- authorization uncertainty;
- evidence already sufficient to report the issue.

## Evidence

Retain only the minimum evidence needed to support the claim:

- endpoint and parameter/input location;
- request method and relevant non-secret input shape;
- baseline/control/probe observations;
- repetition count where needed;
- redacted error excerpt or harmless marker;
- bounded timing measurements when timing was required;
- likely DBMS family only when sufficiently supported;
- explicit uncertainty and alternative explanations.

Redact cookies, tokens, credentials, personal data, and unrelated response content.

## Result

Return a concise finding containing:

- affected surface;
- confirmation method;
- evidence summary;
- confidence;
- demonstrated impact;
- important limits or unverified impact;
- remediation.

Do not include extracted application data because this procedure does not retrieve it.

## Remediation

Primary remediation is to remove user-controlled SQL grammar:

- parameterize values with prepared/bound queries;
- map dynamic identifiers to server-side allowlisted fixed fragments;
- use least-privilege database accounts;
- avoid exposing database error detail to clients;
- add regression tests proving hostile input remains data rather than query structure.

Read [SQL injection prevention](references/prevention.md) for implementation guidance.
