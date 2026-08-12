# Safe Format-Integrity Testing

## Purpose and Preconditions

Use only when the engagement explicitly permits integrity checks and supplies or approves benign test files. The goal is to observe validation and failure handling, not to evade it.

## Safe Workflow

Use a known-good inert sample as the baseline. If approved, submit a single benign damaged variant, such as a truncated copy, at a low rate and within published size limits. Record whether it is rejected, quarantined, processed, or served. Stop immediately on elevated errors, delayed jobs, resource pressure, or any effect outside the designated test object.

## False-Positive Controls

Verify that a failure is attributable to file integrity rather than network interruption, expired authorization, unsupported format, size policy, or asynchronous processing. Do not infer parser exploitation from a rejection, exception message, or service unavailability.

## Evidence and Remediation

Capture only sample IDs, format class, expected decision, observed status, and cleanup. Remediate with strict server-side parsing, bounded resource use, isolated processors, quarantine, and monitored failure handling.

## Sources

- [PortSwigger Web Security Academy: File upload vulnerabilities](https://portswigger.net/web-security/file-upload)
