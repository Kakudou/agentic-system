# Conflict Resolution

Resolve claims, not personalities and not vote totals.

## Evidence Hierarchy

Prefer, in order when applicable:

1. deterministic or directly observed evidence;
2. direct inspection of the actual artifact;
3. authoritative external evidence;
4. reproducible reasoning tied to the artifact;
5. unsupported expert opinion.

The hierarchy is contextual. A qualitative design question may legitimately rely on direct inspection and an explicit rubric rather than a deterministic tool.

## Resolve a Conflict

For each material disagreement:

1. state the conflicting claims neutrally;
2. identify the evidence each claim depends on;
3. determine whether the claims are actually incompatible;
4. prefer the claim better supported by relevant evidence;
5. if evidence cannot resolve it, preserve the disagreement and lower confidence.

## Blocker Test

A finding is blocking only when it demonstrates one of:

- violation of an explicit requirement;
- violation of an explicit constraint;
- failure of the artifact's stated purpose;
- a necessary correctness/safety property without which the artifact cannot be relied on.

Everything else is a non-blocking reservation or stretch suggestion.

## Verdict

Do not derive the verdict from number of findings.

A single proven critical defect may justify `REJECT` or `REVISE`.
A large number of cosmetic notes may still justify `ACCEPT WITH RESERVATIONS` or `ACCEPT`.
