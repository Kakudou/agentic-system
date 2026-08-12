# Command Injection Technique-Selection and Confirmation Matrix

Use after recording scope, a stable baseline, and a candidate input. This matrix selects the least-impactful authorized observation; it is not a payload catalog.

| Signal | Read before testing | Minimum safe method | Confirm when | Do not infer | Stop condition |
| --- | --- | --- | --- | --- | --- |
| Input visibly changes server response | [Inline injection assessment](../references/inline-injection.md) | Paired inert marker and syntax-boundary comparison | Difference repeats against a nearby control | Reflection, one error, or WAF block equals execution | Parser boundary supported or response destabilizes |
| No output, credible command-sink hypothesis | [Blind injection assessment](../references/blind-injection.md) | Approved timing comparison with interleaved controls | Repeated separated result exceeds measured variance | One slow response equals execution | Delay/error budget reached or variability is high |
| No output, timing unsuitable, callback allowed | [Out-of-band observation](../references/out-of-band.md) | One unique opaque callback identifier | Callback uniquely correlates with request and controls exclude background traffic | A callback alone proves target origin | Unexpected/duplicate traffic or correlation is ambiguous |
| Unix clues and shell hypothesis | [Unix behavior](../references/unix.md) | One context-specific parser-boundary comparison | Paired result supports construction through a shell | Host OS proves shell use | Any execution indication or unstable behavior |
| Windows clues and interpreter hypothesis | [Windows behavior](../references/windows.md) | One context-specific parser-boundary comparison | Paired result supports interpreter construction | Windows host proves `cmd` or PowerShell use | Any execution indication or unstable behavior |

## Confirmation Standard

1. Record normal behavior before changing input.
2. Change one variable per request and interleave controls.
3. Repeat only stable observations from a fresh session where feasible.
4. Collect minimum proof, redact sensitive material, and stop. Do not enumerate, write, redirect output, or extract data.

## Remediation Summary

Remove shell invocation; use fixed process APIs and arguments; allowlist bounded values; apply least privilege and egress controls. Read the [remediation lookup](remediation_lookup.md) for implementation mapping.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
