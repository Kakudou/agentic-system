# Event ledger — append-only

Last verified event: (none)

Each actual player/GM exchange is recorded verbatim as `E-0001`, `E-0002`, ... with its outcome, provenance, committed status, and optional mechanical receipt `M-####`. No speculative or unrolled event becomes historical fact. To correct, append a new corrective event referring to the original ID rather than rewriting old history.

## E-0001 — [fill after the first real turn]

- Player verbatim: [actual utterance]
- GM verbatim: [actual utterance]
- Established facts: [confirmed only]
- Mechanics: none or [actual receipt ID]
- Provenance: actual turn / actual rule result
- Status: pending until the on-disk append is verified
