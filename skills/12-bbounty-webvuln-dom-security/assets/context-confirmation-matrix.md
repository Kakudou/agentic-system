# Context and Confirmation Matrix

## Purpose and Preconditions

Use after receiver classification to select the least invasive observation that can answer the current question. Authorization and a unique inert marker are required.

| Receiver context | Question | Allowed confirmation | Interpret as safe only when | Stop when |
|---|---|---|---|---|
| Text node | Did the marker propagate? | Observe rendered text or DOM text value | Marker remains text without parser transition | Rendering or state differs unexpectedly |
| HTML-like renderer | Is parsed structure created? | Inspect existing rendered structure with an inert marker | Context-aware control prevents structural interpretation | Active behavior or sensitive content appears |
| URL/navigation | Is destination policy applied? | Observe normal navigation record or rendered destination | Destination is constrained by documented policy | Navigation leaves authorized scope |
| Attribute | What consumer uses the value? | Inspect element and downstream normal behavior | Element and scheme/type policy constrain the value | Interaction would create an external or stateful effect |
| Cross-window/storage | Is boundary validation present? | Read code and passively observe normal flow | Origin/schema/writer trust is verified before use | Proof needs a message, storage write, or new origin |

## Bounded Test Process

Select one row, perform one marker observation, record the outcome, and return to the flow worksheet. Do not use this matrix to create payloads or manipulate browser state.

## Browser/Runtime Interpretation

The matrix supports conclusions about the observed path only. Browser parsing, framework behavior, and policy enforcement must be recorded rather than assumed.

## False-Positive Controls

Do not infer execution from markup-like text, a keyword, or a navigation parameter. An indeterminate observation remains indeterminate.

## Evidence

Record matrix row, observation method, route, timestamp, outcome, and the reason any stop condition was or was not triggered.
