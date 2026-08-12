---
name: 12-bbounty-recon-web-crawling
description: Plan and document authorized, low-impact web crawl observations within an explicitly approved scope.
metadata:
  version: 2.0
  opencode/slash: "true"
---

# Authorized Web Crawl Reconnaissance

## Purpose

Produce a bounded, reproducible inventory of publicly observable web content for an authorized target. This skill plans and records observation; it does not prescribe crawler execution, browser automation, authentication replay, form submission, or state-changing interaction.

## Prerequisites

- Explicit authorization and a written target scope.
- Named operator, engagement time window, and low-impact rate limit.
- A defined handoff recipient and approved evidence location.
- Written approval before any observation beyond anonymous, safe retrieval of in-scope public content.

## Workflow

### 1. Define scope and stop conditions

Record approved hosts, schemes, paths, exclusions, time window, request budget, and an immediate stop contact in the [crawl-boundary worksheet](assets/crawl-boundary-worksheet.md). Classify unknown redirects, third-party hosts, downloads, APIs, and any stateful route as out of scope until confirmed.

Use [crawl boundaries](references/crawl-boundaries.md) for scope interpretation and [the stop checklist](assets/auth-side-effect-stop-checklist.md) before observing any route that may authenticate, mutate state, or leave the approved boundary.

### 2. Classify seeds and URLs

Start only from approved seeds. Normalize each observed URL, preserve its source page and timestamp, remove fragments for deduplication, and classify it as in-scope public, excluded, external, unknown, or requires approval. Record the decision in the [URL/form observation matrix](assets/url-form-observation-matrix.md).

Use [crawl boundaries](references/crawl-boundaries.md) for classification rules. Do not treat a URL in markup, a sitemap, a script, or a redirect as authorization to access it.

### 3. Decide static or rendered observation

Compare the initial document with the visible public route only when rendering is expressly approved and low impact. Record what each view exposes, whether the difference is material, and any uncertainty. Prefer server-delivered public content; escalate rather than repeatedly loading application routes.

Use [SPA and rendered content](references/spa.md) to distinguish rendering artifacts from confirmed reachable routes.

### 4. Observe forms and authentication boundaries

Inventory visible form metadata without entering values or activating controls. Treat login, logout, password reset, payment, upload, account, consent, destructive, and workflow endpoints as stop conditions. Never use supplied credentials, tokens, cookies, or session material under this skill; request a separately approved test plan if authenticated coverage is required.

Use [form observation](references/forms.md), [authentication boundaries](references/authenticated-crawling.md), and [the stop checklist](assets/auth-side-effect-stop-checklist.md).

### 5. Normalize and validate observations

Deduplicate normalized URLs, retain variants that change origin, path, query semantics, or access class, and separate observed facts from hypotheses. Check that redirects, error pages, navigation shells, CDN assets, and templated routes have not inflated counts. Mark a route as confirmed only when its evidence supports the classification.

Use [result validation](references/result-validation.md) and retain the matrix as the source record.

### 6. Preserve evidence and hand off

Capture the minimum necessary evidence: approved scope reference, seed source, normalized URL, classification, observation time, status or visible behavior, and redacted notes. Do not retain credentials, tokens, personal data, or request bodies unnecessarily. Deliver the bounded inventory and unresolved decisions using the [recon handoff template](assets/recon-handoff-template.md).

Use [evidence and handoff](references/result-validation.md) for interpretation and remediation routing.

## Evidence

- Authorization and scope reference, including exclusions and approved time/rate limits.
- Seed provenance, URL classifications, and boundary decisions.
- Minimal timestamped observations with sensitive values redacted.
- Explicit stop/escalation events and unresolved scope questions.

## Output

Use the [recon handoff template](assets/recon-handoff-template.md). The handoff must distinguish confirmed public observations, excluded or unobserved routes, and hypotheses requiring separate validation.

## Supplemental Index

- [Crawl boundaries](references/crawl-boundaries.md)
- [SPA and rendered content](references/spa.md)
- [Form observation](references/forms.md)
- [Authentication boundaries](references/authenticated-crawling.md)
- [Result validation](references/result-validation.md)
- [Crawl-boundary worksheet](assets/crawl-boundary-worksheet.md)
- [URL/form observation matrix](assets/url-form-observation-matrix.md)
- [Auth/side-effect stop checklist](assets/auth-side-effect-stop-checklist.md)
- [Recon handoff template](assets/recon-handoff-template.md)
