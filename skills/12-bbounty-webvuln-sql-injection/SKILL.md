---
name: 12-bbounty-webvuln-sql-injection
description: SQL injection detection and exploitation. Union-based, error-based, blind boolean/time, OOB (DNS), DBMS auto-detection, schema extraction, and data dumping.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# SQL Injection

## Overview

Detect and exploit SQL injection vulnerabilities across all variants. Tests union-based, error-based, blind boolean/time, and OOB techniques with automatic DBMS detection and schema extraction.

## Prerequisites

- Target URL(s) with known parameters
- Recon data (parameters, endpoints)
- DBMS type (if known)

## Execution Workflow

### Step 1: DBMS Auto-Detection

1. Capture a normal response baseline for each in-scope input and record status, body shape, and latency.
2. Use small, authorized differential probes to establish whether query parsing is influencing the response.
3. Treat error wording, function behavior, and syntax acceptance as hypotheses, not proof, until independently confirmed.

Read [evidence-based DBMS detection](references/dbms-detection.md) once a candidate exists. Use the [DBMS syntax and safe-probe lookup](assets/dbms_payloads.md) only for the candidate database family.

### Step 2: Union-Based Injection

After a stable observable injection candidate is established, determine whether the response can display compatible query output. Confirm the column structure and data compatibility incrementally, then collect only minimum-necessary proof.

Read [UNION-based workflow](references/union-based.md) before testing this branch. Use the [technique selection matrix](assets/sqli_cheatsheet.md) to decide whether an observable response supports this method.

### Step 3: Blind Boolean/Time Injection

When no query output is visible, choose a conditional-response method only if controlled true/false baselines differ reproducibly. Use timing only after measuring normal variance and defining a conservative stop condition.

Read [blind conditional-response workflow](references/blind-boolean.md) for differential controls. Read [blind timing workflow](references/blind-time.md) before any delay-based testing. Use the [printable validation matrix](assets/sqli_validation_matrix.md) to record repeated observations.

### Step 4: Schema Extraction

Only examine metadata after confirming injection and DBMS evidence. Minimize requests and retrieve no personal data or credentials unless the engagement expressly requires and permits it; record schema-level proof wherever sufficient.

Read [schema and metadata discovery](references/schemas.md) and [minimum-necessary data proof](references/data-dumping.md). If errors are the observable signal, read [error-based workflow](references/error-based.md); if an authorized external interaction is the only signal, read [out-of-band interaction workflow](references/oob.md).

## Validation

- Verify injection point is consistent
- Confirm data extraction works
- Check for multiple injection vectors
- Validate schema accuracy
- Test for blind injection variants

## Evidence

- DBMS detection results
- Injection point confirmation
- Schema extraction data
- Data dump samples
- Error messages

## Output Format

```yaml
sqli_report:
  target: string
  timestamp: timestamp
  dbms: string
  injection_points:
    - id: string
      parameter: string
      type: union | blind_boolean | blind_time | error | oob
      evidence: string
      extracted_data: [strings]
  schema:
    tables: [strings]
    columns: [strings]
  impact: low | medium | high | critical
```

## Detailed resources

- [Technique selection and remediation matrix](assets/sqli_cheatsheet.md)
- [DBMS syntax and safe-probe lookup](assets/dbms_payloads.md)
- [Printable validation matrix](assets/sqli_validation_matrix.md)
- [UNION-based workflow](references/union-based.md)
- [Error-based workflow](references/error-based.md)
- [Blind conditional-response workflow](references/blind-boolean.md)
- [Blind timing workflow](references/blind-time.md)
- [Out-of-band interaction workflow](references/oob.md)
- [Evidence-based DBMS detection](references/dbms-detection.md)
- [Schema and metadata discovery](references/schemas.md)
- [Minimum-necessary data proof](references/data-dumping.md)
- [SQL injection prevention](references/prevention.md)
