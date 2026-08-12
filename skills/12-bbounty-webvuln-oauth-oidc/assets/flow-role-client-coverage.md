# Flow, Role, And Client Coverage Worksheet

Use one row for every distinct in-scope client and flow. Record labels and redacted identifiers only.

| Client label | Client type | Flow / response type | Authorization server | Resource server | Callback owner | Requested / granted scopes | Test account role | Controls to review | Evidence reference | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | public / confidential |  |  |  |  |  |  | state, PKCE, callback, claims, authorization |  | not started / complete |
|  | public / confidential |  |  |  |  |  |  | state, PKCE, callback, claims, authorization |  | not started / complete |
|  | public / confidential |  |  |  |  |  |  | state, PKCE, callback, claims, authorization |  | not started / complete |

## Coverage Prompts

- Is this an OAuth authorization flow, an OIDC authentication flow, or machine-to-machine access?
- Which component consumes each artifact and which component authorizes the requested action?
- Is the client public, confidential, native, browser-based, or server-side?
- Which roles, tenants, and scopes are intentionally represented by controlled test accounts?
- Which flows are out of scope or require separate written authorization?
