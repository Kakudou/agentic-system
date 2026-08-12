# State, PKCE, And Redirect Validation Matrix

Complete only checks explicitly allowed by the engagement. Use inert values and stop before any artifact could be delivered to an uncontrolled destination.

| Client / flow | Control | Expected behavior | Safe observation | Result | False-positive control | Evidence reference | Remediation if failed |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | Redirect registration | Exact registered callback is required per client | Review config or safe rejection before login |  | Confirm decisive server response |  | Exact-match registration |
|  | State | Session-bound, one-time value is verified before local login | Observe lifecycle; test abandoned transaction if allowed |  | Fresh session and controlled account |  | Bind, expire, consume state |
|  | PKCE | Public client uses `S256`; verifier is required at exchange | Metadata/configuration or sanctioned negative test |  | Confirm client type and environment |  | Require `S256` and verifier binding |
|  | Callback binding | Callback is associated with client and code flow | Configuration and normal flow review |  | Separate post-login app navigation |  | Bind callback through exchange |

## Stop Conditions

- A variation could deliver an authorization result outside a controlled destination.
- The next step would require code, token, credential, session, or another user's data.
- The program has not explicitly authorized the variation or environment.
