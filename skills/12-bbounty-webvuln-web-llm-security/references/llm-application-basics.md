# LLM Application Basics And Inventory

## Purpose And Preconditions

Use this before assessment to identify the application components that handle instructions, content, data, and actions. Require written scope, a permitted account, and an ordinary baseline. Do not infer undocumented capabilities as facts.

## Bounded Benign Methodology

From approved documentation and normal use, record the user entry point, model or agent stage, supplied and retrieved content, output destination, connected tools, service identities, and approval points. Mark each item as observed, documented, or unknown. Use the [coverage worksheet](../assets/data-tool-trust-boundary-coverage-worksheet.md).

## Observations And Interpretation

An LLM application may transform user input, retrieved content, and system-managed instructions into an answer or proposed action. An agent adds planning or tool-selection behavior. A tool connection is a separate capability boundary, not evidence that it is reachable or authorized.

## False-Positive Controls

Distinguish user-interface claims from verified behavior. Treat model names, capability descriptions, and error text as context only. Reconcile the inventory with the normal-use baseline and documented permissions.

## Stop Conditions

Stop and escalate before accessing non-test data, attempting to enumerate integrations, or invoking an action. Do not inspect hidden prompts, credentials, logs, or internal configuration unless explicitly authorized.

## Evidence

Keep a redacted component list, source classification, scope reference, and unknowns. Do not retain prompts, tokens, user content, or secrets.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM Top 10](https://genai.owasp.org/llm-top-10/)
