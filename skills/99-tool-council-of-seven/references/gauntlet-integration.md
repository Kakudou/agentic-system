# Gauntlet Integration

When invoked by `gauntlet-loop`, the Council becomes an **independent adversarial quality gate**. It does not own the Gauntlet contract.

## Input packet

The Council should receive only what it needs to judge the candidate:

- locked Goal,
- locked Reference / Bar,
- locked Constraints,
- current Candidate / Artifact,
- Evidence Pack,
- criterion identifiers when available.

Prefer a blind packet. Do **not** expose unless necessary:

- builder identity,
- builder chain-of-thought/reasoning,
- effort already spent,
- number of failed attempts,
- emotional framing,
- prior Council verdicts.

This reduces rationalization and sunk-cost bias.

## Contract authority

In Gauntlet mode, the Council may:

- discover defects,
- challenge evidence,
- identify regressions,
- expose missing verification,
- recommend repairs,
- flag stretch improvements separately.

The Council may **not**:

- rewrite the locked goal,
- raise or lower the reference/bar,
- add new mandatory constraints,
- fail a candidate solely because a seat prefers a different design.

## Blocking finding rule

A Council finding is eligible to block Gauntlet acceptance only if it maps to at least one of:

1. an explicit Goal requirement,
2. an explicit Reference/Bar criterion,
3. an explicit Constraint,
4. a prerequisite objectively necessary for the above to hold.

Otherwise classify it for Gauntlet routing as:

- `STRETCH` — worthwhile enhancement outside the contract,
- `RISK` — credible concern not presently proven to violate the contract,
- `DISMISSED` — unsupported or irrelevant to acceptance.

## Severity versus Gauntlet status

Council severity and Gauntlet criterion status are related but distinct.

Examples:

- Council `CRITICAL` mapped to a mandatory criterion usually means Gauntlet `FAIL`.
- Council `MAJOR` without enough evidence may mean `UNVERIFIED`, not automatically `FAIL`.
- Council `NOTE` should not block acceptance.

## Output to Gauntlet

In addition to the human Council Report, provide a compact routing section when the caller needs it:

```yaml
gate_verdict: revise
findings:
  - id: C7-KEIMA-01
    seat: Keima
    severity: critical
    contract_mapping: AUTH-03
    disposition: blocking
    owner_hint: backend
    retest:
      - authentication-negative-paths
  - id: C7-HISHA-02
    seat: Hisha
    severity: minor
    contract_mapping: null
    disposition: stretch
```

The Gauntlet decides PASS/FAIL using its own locked contract and evidence rules.

## Repair routing

When a finding is blocking, phrase it so the Gauntlet can create a targeted repair ticket:

- exact defect,
- contract mapping,
- evidence,
- expected repaired condition,
- minimum retest scope,
- known regression risk.

Avoid vague directives such as “improve quality” or “make architecture cleaner.”
