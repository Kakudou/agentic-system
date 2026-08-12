# Unix Behavior

## Purpose and Preconditions

Read only after documented deployment details, server errors, or a safe prior observation support a Unix-like execution environment. Different Unix shells and direct process APIs parse input differently; do not infer a shell from the operating system alone.

## Behavior to Assess Safely

Determine whether the application appears to pass an argument directly to a program, construct a shell command, or reject syntax before execution. Quoting, tokenization, expansion, separators, redirection, and substitutions are shell-language features, so their relevance depends on the actual execution path. Test one parsing hypothesis at a time with the minimum authorized differential input.

## Interpretation and Controls

Application frameworks may encode or normalize input before it reaches a process. A Unix-looking error can come from a library, container image, proxy, or validation layer. Compare against ordinary invalid input, repeat stable results, and do not use command output or host discovery to identify the platform.

## Evidence and Limits

Record the platform clue, hypothesized execution model, input transformation, paired observations, and alternatives ruled out. Stop if an observation indicates a real command boundary; further enumeration is unnecessary for confirmation.

## Remediation Direction

Use a direct process API with a fixed executable and argument array, do not invoke a shell, and allowlist bounded values before passing them to a process.

## Source

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
