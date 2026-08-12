# GraphQL Assessment Decision Matrix

Use this matrix before each new assessment branch. A `stop` decision ends that branch; it does not authorize a substitute technique.

| Decision point | Continue only when | Minimum next action | Stop when | Record |
|---|---|---|---|---|
| Surface identification | Named endpoint or candidate validation is in scope | One normal-transport confirmation | Route is out of scope, ambiguous, or causes an unexpected effect | Endpoint, method, response class |
| Schema metadata | Introspection is permitted and needed for a hypothesis | Relevant root/type/field observation | Metadata is denied or relevant mapping is complete | Role, metadata scope, relevant mapping |
| Object authorization | Controlled roles, objects, and expected policy exist | One baseline and one approved comparison | Unauthorized data/action is confirmed or context is ambiguous | Role-object-action matrix entry |
| Field or relationship access | A mapped field/relationship is relevant and controlled | Minimal field/relationship comparison | Data sensitivity is unclear, depth limit reached, or unexpected data appears | Parent, relation, fields, result |
| Mutation authorization | Written write approval and cleanup plan exist | One reversible synthetic comparison | Any unexpected state change or missing cleanup path | State before/after, cleanup |
| Aliases | Exact alias ceiling and benign read are approved | One small comparison | Throttle, warning, latency rise, error, or unexpected data | Ceiling, baseline, outcome |
| Transport batching | Supported format and exact batch ceiling are approved | One small batch comparison | Rejection, partial failure, warning, latency rise, or unexpected data | Format, ceiling, outcome |
| Nested query cost | Exact depth, page, and field limits are approved | One relationship increment | Any stop signal or the limit is reached | Depth, page size, result |
| Finding validation | Controlled policy failure is reproducible | One minimal reproduction | Alternative explanation remains unresolved | Proof, controls ruled out |

## Non-Negotiable Stops

- No explicit scope, role/object ownership, or technique-specific cost limit.
- Any request would enumerate unknown identifiers, guess credentials or tokens, flood requests, or perform an unapproved state change.
- Elevated latency, rate limiting, server errors, resource warnings, background work, or unexpected data exposure.
- A result cannot be safely redacted or contains data outside the designated test set.
