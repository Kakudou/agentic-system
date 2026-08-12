# Evidence Standard

Every material finding must be auditable.

## Preferred Evidence

Use the smallest relevant combination of:

- `path:line` source location;
- diff hunk;
- call chain;
- test assertion;
- configuration;
- schema/model contract;
- existing repository convention;
- observed read-only tool output.

## Finding Construction

A good finding looks like:

```text
Issue:
Retry success is reported before the remote write is confirmed.

Evidence:
src/sync.py:88-103 returns success immediately after scheduling the write.
src/client.py:51-70 can still raise RemoteWriteError from the scheduled operation.

Impact:
The caller can persist a successful sync state even though the remote object was never written.

Remediation:
Await/confirm the write before committing sync success, or model the operation as asynchronous and
make the pending state explicit.
```

## Unsupported Claims

Do not assert:

- a performance regression without a credible hot path or complexity/resource argument;
- a security vulnerability without an exploit/failure path;
- a race without concurrent access evidence;
- an API contract that is not visible in code/tests/docs.

When evidence is incomplete, state the uncertainty.
