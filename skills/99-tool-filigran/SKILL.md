---
name: 99-tool-filigran-design
description: Applies Filigran corporate branding and the Filigran UI design system to any requested artifact or experience. Use when the user asks for Filigran-branded websites, applications, dashboards, documents, slides, reports, diagrams, images, videos, or other corporate material. Prefer canonical Filigran UI tokens/components for product interfaces, use the live filigran.io visual language for broader corporate/marketing calibration, and delegate subject-aware design execution to 98-external-frontend-design.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Filigran Brand System

This skill is a **corporate art-direction and design-system overlay**. It is not tied to a single output format.

Apply it whenever a deliverable should look and feel unmistakably **Filigran**: product UI, website, dashboard, internal tool, document, report, slide deck, event asset, diagram, image, video, GIF, social graphic, or another visual medium.

The source of truth is split intentionally:

1. **Filigran UI** is authoritative for product-interface foundations and components.
2. **filigran.io** is the live calibration source for broader corporate/marketing expression.
3. This skill translates those sources to media that the React design system does not directly cover.

Do not turn every corporate artifact into a web app. Preserve the brand language while using the conventions of the requested medium.

## Mandatory dependency

Before crafting design recommendations or producing a final artifact, **invoke `98-external-frontend-design`** and use it as the design/execution skill.

Preferred resolution order:

1. If the host supports skill invocation by name, invoke `98-external-frontend-design`.
2. Otherwise read and apply `../98-external-frontend-design/SKILL.md`.
3. If neither is available, state that the dependency is unavailable before proceeding; do not silently claim it was used.

This skill supplies corporate constraints, design-system facts, Filigran visual calibration, and implementation priorities. The dependency supplies the subject-aware design process, critique loop, originality, accessibility, and artifact-specific execution strategy.

## Source precedence

When sources conflict, use this order:

1. User's explicit instruction for the current artifact.
2. Current live Filigran UI documentation / installed `@filigran/ui` package.
3. Current live `filigran.io` presentation for corporate/marketing surfaces.
4. Verified facts stored in this skill's references/assets.
5. Adaptation guidance in this skill.

The Filigran UI project describes itself as actively evolving. Therefore, **never treat this skill's copied facts as newer than the live design system** when live documentation or installed package code is available.

## Progressive references

Read only what is needed for the task:

- Foundation and visual hierarchy: [references/BRAND-FOUNDATIONS.md](references/BRAND-FOUNDATIONS.md)
- Canonical Filigran UI rules: [references/FILIGRAN-UI.md](references/FILIGRAN-UI.md)
- Colors and gradients: [references/COLOR.md](references/COLOR.md)
- Typography and spacing: [references/TYPOGRAPHY-SPACING.md](references/TYPOGRAPHY-SPACING.md)
- Components and icons: [references/COMPONENTS.md](references/COMPONENTS.md)
- Corporate/marketing calibration from filigran.io: [references/MARKETING-SURFACES.md](references/MARKETING-SURFACES.md)
- Adapting the brand to arbitrary media: [references/OUTPUT-ADAPTATION.md](references/OUTPUT-ADAPTATION.md)
- Handoff contract for `98-external-frontend-design`: [references/HANDOFF.md](references/HANDOFF.md)
- Research provenance and URLs: [references/SOURCES.md](references/SOURCES.md)

Reusable machine-readable material lives in `assets/`:

- `assets/design-tokens.json` — verified token names, spacing values, typography roles, and documented gradient aliases.
- `assets/component-inventory.json` — component/category map derived from current Filigran UI documentation.
- `assets/source-manifest.json` — canonical/observed source map and refresh policy.
- `assets/README.md` — asset policy, especially logos and brand media.

## Corporate identity principles

### 1. Filigran is precise, modern, technical, and credible

The design should communicate cybersecurity expertise without collapsing into generic "hacker" aesthetics. Prefer clarity, confident hierarchy, controlled color, useful data, and polished technical visuals.

Avoid matrix rain, gratuitous terminal noise, random hex strings, skulls, hooded figures, neon-glitch clichés, or decorative threat maps unless the actual subject requires them.

### 2. Blue / turquoise is the primary expressive axis

The Filigran UI system exposes `darkblue`, `blue`, and `turquoise` palette families, while the current corporate site repeatedly uses luminous blue-to-cyan/turquoise and blue-violet gradient treatments against white or very dark navy grounds.

For exact product work, use the design system's live semantic variables/classes rather than inventing replacement hex values.

For non-product brand work, use restrained blue/turquoise gradient energy as a recognizable corporate signature, calibrated against current `filigran.io` rather than a generic SaaS gradient.

### 3. Neutrals carry most of the interface

The UI system provides a broad gray scale and dark background states. Product UI should be calm enough for dense security work: neutral surfaces, clear borders, readable text, selective semantic color.

Marketing work can be more expressive, but still requires generous negative space and crisp white/dark contrast.

### 4. Semantic colors stay semantic

The design system exposes green, red, orange, and yellow families. Treat them primarily as status/feedback/severity colors unless live product guidance says otherwise.

Do not decorate corporate surfaces with warning/error colors merely to make them look "cyber".

### 5. Use real Filigran components when the deliverable is a product UI

When building a React/web UI and `@filigran/ui` is available, **reuse it instead of imitating it**.

The official system includes reusable buttons, gradient buttons, icon buttons, badges, cards, form controls, navigation, feedback components, data display, overlays, loading/skeleton states, and an icon library.

Do not rebuild a near-copy with custom CSS if a canonical component already solves the need.

### 6. Use the official icon language

Prefer `@filigran/ui` / Filigran Icon assets where applicable. The documented catalog includes general interface icons, cybersecurity-domain icons, and product/brand icons such as `LogoFiligranIcon`, OpenCTI/OpenAEV/OpenGRC marks, and XTM-related iconography.

Do not substitute arbitrary icon packs in a product UI unless the required icon is absent.

### 7. Corporate layouts should feel structured, not ornamental

Use clear grids, deliberate spacing, strong content grouping, and consistent component rhythm. The brand should look engineered and trustworthy.

Visual sophistication should come from composition, type hierarchy, gradient/light treatment, imagery, and selective motion — not from excessive chrome.

### 8. Copy should separate signal from noise

The current corporate site emphasizes concise action-oriented headlines, clear explanation, concrete metrics, customer proof, product capability, ecosystem depth, and direct calls to action.

Use short, confident headings and evidence-rich supporting content. Avoid vague superlatives and empty cyber jargon.

### 9. Product brand and marketing brand are related but not identical

- **Product UI:** design-system-first, component-driven, dense when needed, accessibility and operational clarity first.
- **Marketing/corporate:** larger typography, more whitespace, stronger gradients, hero imagery, storytelling, customer proof, bolder section transitions.
- **Docs/reports/slides:** borrow corporate typography/color/geometry without pretending to be either a product screen or a landing page.

## Do not mix with personal Black Ice styling by default

If the repository also contains a personal Black Ice/cyberpunk skill, treat it as a separate identity.

When the user asks for **Filigran corporate branding**, do **not** add Black Ice glitch layers, TARDIS-blue overrides, lightsaber colors, cyberpunk HUD frames, or personal logo treatment unless the user explicitly requests a hybrid.

Corporate-brand fidelity wins over personal aesthetic preferences in corporate artifacts.

## Workflow

1. **Identify the artifact and context.** Determine whether this is product UI, corporate marketing, documentation, presentation, report, diagram, event/media asset, or another medium.
2. **Invoke `98-external-frontend-design`.** Use its subject-grounding and critique process.
3. **Choose source mode.** Product UI → Filigran UI first. Corporate/marketing → filigran.io calibration first. Mixed artifact → combine carefully.
4. **Refresh live sources when exactness matters.** If web/package access exists, check the current docs before hard-coding palette values, component APIs, or typography implementation.
5. **Assemble the Filigran brief.** Map color, typography, spacing, composition, components, icons, imagery, data, and motion to the requested medium.
6. **Choose one subject-specific signature.** It must come from the artifact's content, not from adding generic cybersecurity decoration.
7. **Build with canonical components where possible.** For product UI, prefer `@filigran/ui` and documented tokens/classes.
8. **Critique for brand drift.** Remove anything that feels generic-SaaS, generic-hacker, personal-cyberpunk, or visually louder than the content.
9. **Check accessibility and state semantics.** Preserve contrast, focus, reduced motion, non-color state cues, touch targets, readable chart legends, and safe destructive patterns.
10. **Deliver in the user's requested format.** Do not force a web deliverable when another medium fits better.

## Completion checklist

Before final delivery confirm:

- The dependency skill was invoked/applied.
- The artifact uses current Filigran UI rules when it is a product interface.
- Exact colors were taken from live/canonical sources when available, not guessed.
- Blue/turquoise expression feels Filigran rather than generic SaaS.
- Semantic colors communicate meaning rather than decoration.
- Typography follows documented roles or a careful medium-specific translation.
- Spacing is systematic and consistent.
- Existing Filigran components/icons were preferred over reinvention where applicable.
- Marketing surfaces use clear hierarchy, evidence, whitespace, and direct CTAs.
- No Black Ice/personal aesthetic leaked into a corporate artifact unless explicitly requested.
- Accessibility remains intact.
- The result is appropriate to the requested medium rather than a forced website metaphor.
