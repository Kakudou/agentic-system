# Form Observation

## Purpose and Preconditions

Use this reference to document visible public form structure without testing form behavior. Confirm that the route is in scope and that passive metadata observation is permitted.

## Low-Impact Methodology

Record only information visible without interaction: form label, displayed purpose, method if disclosed, action destination if disclosed, and field categories such as search, login, contact, upload, or payment. Note whether the action is same-scope, external, unknown, or absent. Use the URL/form matrix; do not infer hidden behavior from field names.

## Observations and Interpretation

- Missing method or action attributes do not establish a default request behavior for this engagement.
- Hidden, disabled, autofilled, or client-generated fields can be implementation details and may contain sensitive or stateful values.
- Search, contact, upload, account, administrative, and checkout forms have different risk and side-effect profiles; classify their purpose rather than probing them.
- A form endpoint is a candidate for separately approved validation, not evidence of a defect.

## State-Change Avoidance

Never enter, submit, reset, upload, attach, authenticate, subscribe, purchase, send messages, or invoke a form action. Do not collect hidden values, anti-forgery material, personal data, or tokens. Stop on any indication of account, transaction, or workflow state.

## Limits, Evidence, and Handoff

Observe only approved public pages and stay within the declared request budget. Record source URL, visible label, field categories, disclosed destination, classification, and redacted evidence. Escalate all interactive testing to an approved test plan. See [MDN: `<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form) and [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).
