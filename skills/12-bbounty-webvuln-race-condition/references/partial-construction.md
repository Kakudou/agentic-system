# Partial Construction

## Purpose and Preconditions

Use when object creation or updates have observable intermediate stages. Require a disposable object and confirmation that observation cannot access another user's data or activate privileges.

## Safe Bounded Methodology

Map creation, validation, initialization, publication, and cleanup. Use documented test hooks or permitted read-only status views to establish whether incomplete objects are externally visible. Do not vary parameter shapes, inputs, or timing to induce uninitialized behavior.

## State And Idempotency Interpretation

An incomplete record is acceptable when it is private, inert, and cannot authorize subsequent actions. A risk exists only when an incomplete state violates an access, integrity, or lifecycle invariant. Retries must converge without publishing duplicate or malformed objects.

## False-Positive Controls And Limits

Rule out eventual consistency, delayed indexing, UI placeholders, and fixture seeding. Use one isolated object and stop on unexpected visibility, notification, or privilege effect.

## Evidence

Record the lifecycle map, allowed and observed visibility, authoritative object state, audit data, and verified deletion or restoration.

## Remediation

Keep objects private until validation completes, validate before publication, use transactions, and enforce authorization checks on every intermediate-state consumer.

## Source

- PortSwigger, [Multi-endpoint race conditions](https://portswigger.net/web-security/race-conditions)
