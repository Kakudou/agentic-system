# Execution Guardrails Reference

Read this before the Gauntlet mutates external systems, performs destructive actions, handles high-stakes decisions, or relies on tools it may not actually have.

## 1. Capability truthfulness

Never claim a tool, test, deployment, observation, or external action occurred unless it actually occurred and produced inspectable evidence.

If execution is unavailable:

- continue with design/static review where useful;
- mark execution-dependent criteria UNVERIFIED;
- return BLOCKED if those criteria are mandatory.

## 2. Plan-validate-execute for risky mutations

For destructive, expensive, difficult-to-reverse, or externally visible actions:

1. create the intended change plan;
2. validate it against the locked contract and current state/source of truth;
3. identify rollback/recovery where applicable;
4. execute only with the permissions and confirmations required by the host/user context;
5. verify the actual post-change state;
6. collect evidence for the Council.

The Gauntlet loop never overrides platform safety, permission, or confirmation requirements.

## 3. Do not multiply risk through fan-out

Parallel builders must not independently mutate the same production/external state.

Prefer parallel planning/analysis and a single controlled mutation path when writes conflict or consequences are irreversible.

## 4. High-stakes domains

For legal, medical, financial, safety-critical, or similarly consequential work:

- use authoritative and current sources when factual correctness depends on them;
- separate verified facts from inference;
- expose uncertainty;
- do not treat Council consensus as a substitute for required professional review or formal certification;
- make any mandated human approval a hard constraint/criterion.

## 5. Reference integrity

A reference can be wrong, unsafe, incompatible, or outdated.

Hard constraints and authoritative requirements take precedence over imitation. If the requested bar conflicts with a higher-priority constraint, return HUMAN_DECISION_REQUIRED or BLOCKED rather than copying the defect.

## 6. External change verification

After an external mutation, verify the real state rather than the request response alone when possible.

Examples:

- deployment: check readiness/health, not only "deploy command succeeded";
- file edit: read the saved file/diff;
- calendar/message action: inspect returned object/status;
- database change: query the resulting state;
- infrastructure change: validate the resulting configuration/service behavior.
