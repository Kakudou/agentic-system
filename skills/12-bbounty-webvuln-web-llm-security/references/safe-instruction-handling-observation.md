# Safe Instruction-Handling Observation

## Purpose And Preconditions

Use only after the trust-boundary map is complete and only with an approved non-sensitive fixture or test environment. The purpose is to observe whether content roles remain distinct, not to override application behavior.

## Bounded Benign Methodology

Perform an ordinary permitted task, then repeat it with a clearly inert marker that resembles a content label but makes no request and cannot affect data or actions. Compare display, attribution, and task completion. Use the [decision matrix](../assets/safe-observation-decision-matrix.md). Do not ask for instructions, capabilities, data, or tool use.

## Observations And Interpretation

Record whether the application presents untrusted content as data, preserves source labeling, and keeps the ordinary result stable. Unexpected changes may justify a design review; they do not demonstrate access, disclosure, or action impact.

## False-Positive Controls

Repeat the same benign comparison once in the same authorized conditions. Rule out formatting, retrieval variation, session context, model nondeterminism, and fixture differences. Do not increase prompt complexity.

## Stop Conditions

Immediately stop if content suggests exposure of sensitive material, a tool/action attempt, a cross-user effect, or any state change. Do not capture sensitive output; notify the named owner using the approved channel.

## Evidence

Record fixture identifiers, timestamps, redacted input category, expected versus observed behavior, repeat result, and stop status.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
