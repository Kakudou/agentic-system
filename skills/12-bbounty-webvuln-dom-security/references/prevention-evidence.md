# Prevention and Evidence

## Purpose and Preconditions

Turn a confirmed or unresolved flow into a bounded engineering recommendation and reviewable evidence package. Require a completed flow record; do not recommend controls from API names alone.

## Bounded Process

1. Match the final receiver context to the safest available API or context-specific encoding rule.
2. Identify where validation, allowlisting, or trusted-type/framework policy belongs in the traced path.
3. Specify a regression observation using the same inert marker and normal route; it must demonstrate text rendering, safe rejection, or policy enforcement.
4. Separate verified facts, assumptions, and out-of-scope proof requirements in the report.

## Browser/Runtime Observations

- Prevention is supported when the observed receiver treats the marker as text, rejects invalid data, or applies a documented policy on the executed path.
- A content security policy can reduce impact but does not replace safe DOM APIs and context handling.
- Record browser differences only when they affect the observed control.

## False-Positive Controls

- Do not prescribe generic escaping without naming the output context.
- Do not call a fix complete based only on static code review; retain the bounded regression observation.
- Avoid claiming that a policy blocks a flow unless the relevant directive and browser behavior are evidenced.

## Evidence

Include the flow ID, context, recommended code-level control, owner, regression observation, residual risk, and authoritative source.

## Sources

- PortSwigger, [DOM-based cross-site scripting](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- OWASP, [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
