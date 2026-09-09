---
name: 01-doc-filigran-style
description: "Create source-grounded Filigran corporate-media specifications and creation guidance, or audit static presentations, reports or one-pagers, diagrams or infographics, and social graphics. Conditionally supports static product-UI-inspired technical presentations and diagrams when explicitly requested or grounded in supplied visual references. Use only for authorized official Filigran work with approved assets and trademark or logo permission; not for email, product UI or React implementation, motion or video, production print, publishing, legal certification, or generic design work."
metadata:
  version: "1.2.0"
  opencode/slash: "true"
---

# Doc - Filigran Style

Produce evidence-labelled specifications, creation guidance, and audits for Filigran's approved static digital corporate-media suite. Corporate identity governs marks and corporate communication. When requested or supported by supplied visual references, inspected product UI evidence may deliberately guide the non-brand surfaces and composition of static technical presentations or diagrams without becoming corporate law.

## Usage

- `/01-doc-filigran-style brief {presentation|report|one-pager|diagram|infographic|social-graphic}`
- `/01-doc-filigran-style create-guidance {medium} {source-material}`
- `/01-doc-filigran-style audit {artifact-or-specification}`

## Scope

Included:

- static digital presentations;
- static digital reports and one-pagers;
- static diagrams and infographics;
- static social graphics;
- style profiles, briefs, specifications, creation guidance, and audits for those media.

Excluded:

- email production;
- motion and video;
- production print and press-ready preflight;
- product UI or React implementation;
- publishing, posting, distribution, or account actions;
- legal review, trademark clearance, brand certification, or final brand-owner approval;
- artifact rendering unless a separate, authorized capability actually creates and verifies it.

## Required Inputs and Stop Gates

Before substantive work, obtain:

1. workflow and medium;
2. purpose, audience, message, channel, dimensions or aspect ratio, and delivery format;
3. source content, claims, data, citations, and mandatory copy;
4. accessibility and export requirements;
5. identity-expression choice: `corporate editorial`, `product UI-inspired technical`, or a supplied/custom direction;
6. supplied visual references, if any, plus the traits to inspect and their intended authority for this deliverable; otherwise record that none were supplied;
7. light/dark preference, or permission to derive the theme from any inspected references and the approved corporate/content context;
8. current brand-owner-approved instructions and approved Filigran assets for this deliverable;
9. explicit confirmation of permission to use the relevant trademarks, logos, product marks, photography, and other proprietary assets.

Authorized official-work context alone does not satisfy items 8–9. Public availability and the UI repository's Apache-2.0 license do not grant trademark rights. If approval or assets are absent, stop mark/asset use and offer a mark-free structural analysis only if accepted. Never redraw, trace, screenshot-extract, reconstruct, or approximate a mark.

Stop or narrow scope if required content is materially incomplete, a claim cannot be grounded, dimensions make content unreadable, rights are unclear, source conflict is consequential, or the request enters excluded scope.

Visual references are optional. For reference-free `corporate editorial` work, proceed from current deliverable-specific instructions, Corporate Identity, source content, audience, medium, and legibility; record that no visual references were supplied, classify the resulting theme/layout translation as `[IA]` or `[LEC]` where authority is silent, and do not block the specification merely for lack of a reference image or deck.

## Evidence Classes

Every style, layout, color, typography, imagery, icon, logo, copy, accessibility, or export rule in an output has exactly one primary class:

- **`[DR] Documented rule`** — explicit in current brand-owner-approved material or cited official documentation.
- **`[IE] Inspected evidence / observed fact`** — observed in a named official artifact, bounded source review, pinned product UI source, package, component, or official implementation; not automatically corporate-media law.
- **`[IA] Inferred adaptation`** — reasoned translation into static corporate media; never call it official.
- **`[LEC] Local editorial choice`** — project-specific choice where authority is silent.

A claim may have supporting sources but only one primary class. Capability procedures do not need brand-evidence labels.
Source-absence findings must be bounded as “not found in the reviewed sources,” never stated as universal absence.

## Authority and Conflict Policy

Apply authority within the relevant domain rather than treating one source as universal:

1. Current brand-owner-approved instructions and assets for the actual deliverable control their stated scope.
2. Official public [Filigran Identity](https://zeroheight.com/020822383/p/08b3df) controls marks, exact corporate palette, typography roles, imagery, and corporate messaging.
3. Other current official Filigran corporate sources, newsroom material, and kits support their documented domains.
4. When the selected expression is `product UI-inspired technical`, inspected Filigran UI documentation and pinned source may deliberately control non-brand surfaces, elevation, layout rhythm, component character, and status semantics as `[IE]` evidence.
5. Translation of that UI evidence into static media is `[IA]`; it never overrides mark rights, exact corporate colors, or corporate identity, and it must never be called corporate law.
6. Unsupported project decisions remain `[LEC]`.

Resolve conflicts by domain and evidence; do not blend sources into invented rules. UI status semantics apply only when represented accurately. Corporate-first means establishing protected identity decisions before expression choices; it does not mean light-first. Record access date, source date, commit/package where relevant, conflict, and approval status. Seek brand-owner direction for consequential ambiguity.

## Progressive Disclosure

Always load:

- [Corporate identity](references/corporate-identity.md) for corporate logo, palette, typography, imagery, narrative, values, kits, and known gaps.
- [Provenance and rights](references/provenance-and-rights.md) for source hierarchy, evidence registration, freshness, licensing, trademarks, rights, and conflict handling.

Load conditionally:

- [Product UI foundation](references/product-ui-foundation.md) when translating product semantics, using UI-derived patterns, auditing product screenshots/diagrams, or deciding icon, loader, status, surface, spacing, or component intent. Do not load it as authority for corporate identity.
- [Technical presentation style](references/technical-presentation-style.md) when the user requests a Filigran product-UI-inspired technical presentation/diagram, supplied references exhibit that expression, or the dark technical branch is being considered. This is a direct, static-only conditional reference; it is never a universal dark-mode mandate.
- [Corporate-media adaptation](references/corporate-media-adaptation.md) for every medium-specific specification, creation-guidance request, or audit.
- [Media style brief](assets/media-style-brief.md) when drafting a new specification/create-guidance handoff or when checking whether an audit received enough baseline information. Do not fill it mechanically when a concise audit is requested.

## Workflow A — Specification / Create Guidance

1. Confirm scope, rights, approved assets, medium, dimensions, content, output format, identity-expression choice, and light/dark preference or derivation permission.
2. Build an evidence ledger: ID, claim, class, source, access/version, confidence, conflict, and approval.
3. Inspect supplied visual references, if any, and record observed traits and intended authority before choosing a theme. If none were supplied, record `none` and use the reference-free corporate-editorial fallback when that branch applies. Do not infer authority merely from appearance.
4. Establish protected corporate identity decisions first: approved mark, exact corporate palette roles where used, type families, imagery criteria, and current narrative/value/boilerplate sources. This does not select a light canvas.
5. Select and record the expression/theme branch. For an explicit Filigran product-UI-inspired technical request or matching supplied UI screenshots, start from the dark technical branch unless the references or instructions indicate otherwise. In every other case, derive the theme from approved instructions, references, and content rather than defaulting to dark.
6. Add only relevant UI evidence. Keep corporate colors separate from UI non-brand surfaces and semantic/status/entity colors; import only the selected subset.
7. Translate into the medium using labelled adaptations. Choose readable type scale, grid, hierarchy, imagery, density, and export settings rather than copying compact UI arrangements.
8. Specify logo/icon/product-mark/loader decisions, asset provenance, deterministic local font/asset embedding requirements when applicable, accessibility, non-color cues, false-clickability avoidance, and do-not-do constraints. When this workflow actually acquires or copies an approved logo/font, or prepares a deterministic downstream embedding handoff, record the exact source, archive, member, filename, and version plus a `SHA-256: <digest>` record when that digest is generated or available. Otherwise, do not block a specification merely because no file was acquired.
9. Record every source conflict, local choice, unknown, and approval dependency.
10. Complete the brief and downstream verification handoff. Do not claim rendering or approval that did not occur.

Creation guidance must be executable: state dimensions, hierarchy, layout logic, approved values, safe areas, content limits, checks, and explicit prohibitions.

## Workflow B — Audit

1. Confirm rights, baseline authority, approved kit/version, scope, and exact files/pages/frames.
2. Record inspectability limits. Screenshots cannot prove editability, hidden structure, font embedding, metadata, or inaccessible content.
3. Compare the artifact with the evidence ledger and relevant medium brief.
4. Rate each criterion:
   - `PASS` — inspectable evidence meets it;
   - `FAIL` — inspectable evidence contradicts or misses it;
   - `UNVERIFIED` — evidence or inspectability is insufficient;
   - `NOT_APPLICABLE` — it does not apply to this artifact.
5. Keep four result groups separate: sourced-rule compliance (`[DR]`, directly applicable `[IE]`), adaptation consistency (`[IA]`), general quality/accessibility, and brand-owner approval.
6. For each finding give location, class, criterion, observation, impact, confidence, status, and repair.
7. Keep brand-owner approval `UNVERIFIED` unless actual approval evidence is supplied. Never average categories into “brand compliant.”

## Output Contract

### Specification / Create Guidance

Deliver:

1. context, scope, rights, approved baseline, and access date;
2. evidence ledger and conflicts;
3. corporate identity foundation;
4. medium-specific dimensions, grid, hierarchy, and content system;
5. typography, corporate/UI color decisions, imagery, patterns, icons, logos, product marks, and loader decisions;
6. accessibility and export checks;
7. uncertainties, local choices, and approvals required;
8. exact sources and downstream creation/verification handoff.

### Audit

Deliver:

1. scope and inspectability limits;
2. rights, kit, and authority baseline;
3. findings in the four separate result groups;
4. prioritized repairs;
5. source freshness and unresolved conflicts;
6. category statuses, never blanket legal, accessibility, or brand certification.

## Hard Rules

- Use approved official kits; never redraw, trace, screenshot-extract, or approximate assets.
- Preserve the documented logo protected area based on the illustrated lowercase “n”; do not invent millimetres, pixels, geometry, minimum size, or a broader co-branding system.
- Use exact corporate palette hex values whenever a corporate palette role is used. Never replace them with UI near-matches; in the selected UI-inspired branch, separately sourced UI values may govern only non-brand surfaces and accurate UI semantics.
- Do not let UI tokens override corporate identity.
- Use UI semantic/status/entity colors only when their concepts are accurate and meaning remains distinguishable.
- Never describe `[IA]` or `[LEC]` as official.
- **[IE] Factual reviewed baseline:** Treat the slide-grid, social-size, report-page-size, production-print-specification, numeric-logo-minimum, formal-co-branding-system, complete corporate type scale (sizes/line heights/tracking), and comprehensive-tone-guide gaps only as findings from the official Identity corpus enumerated in [Provenance and rights](references/provenance-and-rights.md#source-register--corporate-identity) and reviewed 2026-08-29. Before relying on any such gap, freshly check that corpus and record the new access date; never turn the bounded absence finding into a universal or permanent claim.
- Never copy compact UI typography into distant-view media without legibility adaptation.
- Never treat dark mode as universal or corporate-first as light-first; choose the canvas from the selected expression branch and evidence.
- Never import the full UI token system when a small, source-recorded subset is sufficient.
- Never make static patterns look clickable.
- Never freeze an arbitrary incomplete frame of `FiligranLoader`; use an approved static mark in static media.
- Never use color alone for meaning or claim accessibility from partial checks.
- Never freeze long corporate statistics, funding figures, boilerplate, or product copy without fresh retrieval.
- Never expose transient signed asset links or infer broad redistribution rights.
- Never claim rendering, export, publication, rights clearance, certification, or owner approval without evidence.

## Completion Checks

Verify:

- workflow, approved medium, dimensions, audience, purpose, and format are explicit;
- selected identity-expression/theme branch, branch trigger, source, supplied-reference observations and intended authority when references exist (or an explicit `none supplied` record), and light/dark decision are explicit;
- authorized instructions/assets and mark permission are recorded, or the work is explicitly mark-free;
- protected corporate identity decisions were established before product UI expression, without assuming a light canvas;
- every material rule has one evidence class and every `[DR]`/`[IE]` has a traceable source;
- official Identity sources use full URLs and access date;
- UI evidence, if used, records commit `860a13c2e12eb01c490936ce871ada08fcba9ec3`, `@filigran/ui` `1.6.10`, `@filigran/icon` `0.24.3`, and inspection date `2026-08-31`;
- exact approved logo variant is correct for its field; when the workflow acquired/copied it or prepared a deterministic embedding handoff, its exact source/archive/member/filename/version and any generated or available hash are recorded as `SHA-256: <digest>`, with the authorized local path where applicable, without redraw or recolor;
- logo protected-area, exact corporate palette, selected UI token subset, fonts, imagery/cliché, narrative/value/boilerplate, icon/product-kit/loader, and provenance decisions are explicit where applicable;
- deterministic local asset/font embedding and render/export verification requirements are handed off when applicable; actual hash records are labelled `SHA-256: <digest>`, but absence of an acquired file does not block a specification; no render/export success is claimed without evidence;
- corporate and UI colors remain distinct;
- source conflicts and local choices remain visible;
- final color pairs, non-color cues, reading order, and absence of fake clickability are checked where inspectable;
- large-room type, viewing-distance legibility, density budget, full-size/thumbnail/projector views, clipping, and overlap are checked where applicable and inspectable;
- audit uses `PASS`, `FAIL`, `UNVERIFIED`, or `NOT_APPLICABLE` per criterion;
- brand-owner approval remains `UNVERIFIED` without supplied evidence;
- excluded work and downstream unverified effects are explicit.

If a mandatory check fails, return `BLOCKED` with the missing input or evidence rather than reporting completion.
