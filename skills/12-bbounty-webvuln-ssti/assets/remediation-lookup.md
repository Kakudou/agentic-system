# SSTI Remediation Lookup

| Observed design issue | Primary correction | Supporting controls | Regression evidence |
|---|---|---|---|
| Request data is concatenated into template source | Replace with a fixed reviewed template and typed data binding | Input validation; code review rule | Syntax-shaped test input renders as literal data |
| User controls template name or path | Replace with an allowlisted server-side template selector | Canonical path mapping; authorization checks | Invalid selectors cannot load unapproved templates |
| Renderer exposes broad helpers or context | Supply an explicit minimal view model | Disable debug helpers; least-privilege process account | Tests show only required fields are available to fixed templates |
| Dynamic compilation is required by product design | Move to a constrained, reviewed template service with strict tenant and data boundaries | Sandboxing where supported; resource limits; monitoring | Security review and negative tests for untrusted template source |
| Output encoding is inconsistent | Encode values at the final HTML, attribute, URL, JavaScript, email, or document sink | CSP for browser sinks; framework auto-escaping | Context-specific encoding tests pass |
| Debug/error output reveals template internals | Disable verbose errors in production and use safe server-side logging | Access-controlled diagnostics | Public error response contains no implementation detail |

## Prioritization

1. Eliminate untrusted template source construction.
2. Constrain template selection and rendering context.
3. Reduce renderer privileges and exposure.
4. Add regression coverage and monitor rejected syntax-shaped inputs.

Output encoding is valuable, but it is not a substitute for preventing untrusted input from becoming template source.
