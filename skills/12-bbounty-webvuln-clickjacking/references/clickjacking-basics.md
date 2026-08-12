# Clickjacking Basics

## Purpose and Preconditions

Use to triage whether an authorized page warrants frame-policy assessment. Have a known in-scope URL and an action classification; do not explore actions merely to classify them.

## Safe Bounded Methodology

Review ordinary navigation, visible page purpose, and delivered policy. Classify the page as informational, low-risk action, sensitive action, or out of scope. Confirm only non-interactive framing behavior in the approved context.

## Observations and Interpretation

Clickjacking is a UI-redressing risk in which a victim may be induced to act on a framed target while believing they are interacting elsewhere. Framability is a prerequisite, not proof of impact. Risk increases only when a meaningful action could be initiated without an independent safeguard.

## False-Positive Controls

Account for explicit user confirmation, server-side reauthentication, documented embeds, public read-only pages, and action flows that cannot be reached or completed in the observed state.

## Cleanup and Stop Conditions

Close assessment tabs and stop before any action, credential prompt, consent dialog, or state transition.

## Evidence and Remediation

Record page purpose, action category, final policy, browser result, and safeguards. Restrict framing for sensitive pages and retain a minimal documented allowlist only where product embedding requires it.

Sources: [PortSwigger: Clickjacking](https://portswigger.net/web-security/clickjacking), [PortSwigger: CSP](https://portswigger.net/web-security/cross-site-scripting/content-security-policy).
