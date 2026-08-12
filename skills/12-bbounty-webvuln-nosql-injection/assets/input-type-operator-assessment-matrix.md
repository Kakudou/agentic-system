# Input, Type, and Operator Assessment Matrix

Use this matrix after authorization and baseline capture. It selects a bounded validation observation, not a payload. Do not use it for authentication inputs, data extraction, enumeration, or timing tests.

| Input contract | Boundary to assess | Permitted observation | Expected safe result | Stop condition | Evidence |
|---|---|---|---|---|---|
| Scalar identifier or text | Scalar versus unexpected structure | One invalid structural representation | Schema rejects before data access | Any record outside test scope | Contract, status, validation class |
| Number or boolean | Type coercion | One incompatible primitive type | Consistent validation error | State or authorization change | Baseline/differential metadata |
| Finite array | Element and nesting validation | One invalid element or nesting level | Whole request rejected or safely normalized | Broad result or service instability | Element rule, response shape |
| Documented filter object | Key and operator allowlist | One undocumented key or depth | Rejected or ignored consistently | Query semantics exceed test record | Published grammar, audit signal |
| Sort or projection option | Server-owned metadata | One unsupported option name | Rejected; response shape unchanged | New field exposure | Option allowlist, response schema |
| Alternate encoding | Parser equivalence | Equivalent valid value across supported transport forms | Same typed value and authorization result | Different visibility or role behavior | Encoding, headers, outcome |

## Decision Matrix

| Result | Minimum evidence | Disposition |
|---|---|---|
| Input rejected at schema boundary | Baseline, validation result, stable response shape | Negative evidence. |
| Different parser outcome only | Controlled baseline and repeat | Inconclusive; investigate validation layer. |
| Test-record-limited semantic change corroborated by logs or source | Repeated differential, control conditions, corroboration | Candidate finding. |
| Broader records, authorization, state, or instability | Sanitized observation and immediate stop | Escalate through authorized validation; do not continue. |

## Recording Notes

- Keep method, identity, content type, cache state, pagination, and test record fixed.
- Use one input and one hypothesis per comparison.
- Restore the known-good value after every differential.
- Record response categories and shapes, not sensitive bodies.
