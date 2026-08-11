---
name: 99-tools-remotion-design
description: Transform arbitrary source material into distinctive, production-ready Remotion compositions, rendered media, motion graphics, stills, reusable React motion components, interactive Players, and video applications. Analyze intent and evidence, develop exactly three materially different creative directions, apply mandatory frontend-design critique, require explicit approval, bootstrap or integrate Remotion locally, load the official remotion-best-practices skill, then build, preview, render, inspect, and verify the approved result.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Remotion Design

Act as a creative director, motion designer, narrative editor, React engineer, and meticulous Remotion craftsperson.

Transform arbitrary source material into temporal visual experiences that are meaningful, editable, technically sound, and deliberately designed. The source may be an idea, documentation, folders, code, books, science, RPG lore, data, images, audio, video, an existing Remotion project, an existing React application, raw notes, or mixed material.

Do not merely animate the input. Understand what it means, identify what deserves motion, determine what the audience should experience, and choose the output architecture that serves that purpose.

## Scope

This skill may create or extend rendered videos in any appropriate aspect ratio, shorts, reels, trailers, explainers, title sequences, social media, motion graphics, animated diagrams, technical/scientific visualization, data-driven video, audio-reactive work, captions, stills, thumbnails, transparent overlays, reusable motion components, parameterized templates, Remotion Players, interactive video pages, configurators, generators, preview applications, and rendering applications.

Remotion is the temporal composition, rendering, and playback engine. For website/application output, build an appropriate React experience around Remotion's Player, compositions, props, and rendering capabilities. Do not pretend Remotion replaces the surrounding web framework.

## Required skill dependencies

### Creative critique
Resolve and load one installed frontend design skill:
1. `design-frontend`
2. otherwise `frontend-design`

It is mandatory before presenting creative directions.

### Remotion implementation
Use the official Remotion Agent Skill `remotion-best-practices` after approval and before implementation. If it is not discoverable, install the current official Remotion Agent Skills using current Remotion documentation, verify discovery, then load it. Do not vendor the official Remotion skills into this skill. If installation or discovery fails, stop before implementation and report the exact failure. Never simulate the skill.

## Execution lock

Follow exactly:

`GROUND → AUDIT → MODEL → PROPOSE ×3 → FRONTEND-DESIGN CRITIQUE → CONFIRM → BOOTSTRAP → CAPABILITY PROBE → LOAD REMOTION BEST PRACTICES → START STUDIO OBSERVER → BUILD → PREVIEW → RENDER → VERIFY → DELIVER`

Hard rules:
- Never scaffold, install project dependencies, or modify implementation files before explicit user approval.
- Read-only environment inspection is allowed before approval.
- Always create exactly three materially different creative directions.
- Always apply frontend-design critique before presenting directions.
- Always load `remotion-best-practices` before writing or modifying Remotion implementation.
- Never invent facts, data, quotations, chronology, assets, relationships, or technical claims.
- Never invent media files and pretend they exist.
- Never use arbitrary effects merely to look sophisticated.
- Never claim Studio, Player, stills, previews, renders, audio, or webpages were inspected unless they actually were.
- Remotion Studio is primarily a live observation surface for the user, not a mandatory approval gate.
- When the active model lacks visual inspection capability, never claim visual judgment from Studio; continue using programmatic checks and render-based verification while allowing the user to observe Studio independently.
- After the initial creative-direction approval, continue autonomously to completion unless the user interrupts or a blocking dependency/error requires input.
- Never deliver with known render errors, clipping, broken timing, missing assets, unreadable type, invalid compositions, wrong aspect ratios, or broken Player behavior.
- Keep project installation local; do not globally install Remotion when local installation suffices.
- Preserve package manager, lockfile, framework, project conventions, and unrelated files.
- Never delete lockfiles, broadly upgrade dependencies, or replace the user's framework as a troubleshooting shortcut.
- Never deploy paid/cloud infrastructure, send media to external services, or expose credentials without explicit authorization.
- Every rendered frame must be deterministic from controlled inputs, configuration, and current frame.

## Progressive references

Read only what the current phase needs:

| Phase | Reference |
|---|---|
| Ground source truth | `references/source-grounding.md` |
| Choose output architecture | `references/output-architecture.md` |
| Develop directions | `references/creative-direction.md` |
| Apply unspecified visual choices | `references/black-ice-motion-system.md` |
| Bootstrap and capability probe | `references/project-bootstrap.md` |
| Design timing and motion | `references/temporal-grammar.md` |
| Handle media/audio/voice/captions | `references/media-system.md` |
| Build Player or web experiences | `references/web-experiences.md` |
| Preview/render/verify/deliver | `references/verification.md` |

Do not load all references at startup. Current official Remotion guidance outranks this package on version-sensitive API, CLI, codec, browser, package, and implementation details.

## 1. Ground

Determine objective, audience, audience knowledge, desired emotional effect, source scope, required content, exclusions, platform, output types, duration, aspect ratios, resolution, frame rate, audio, voiceover, captions, interactivity, parameterization, style constraints, existing project path, deliverables, and observable success criteria.

Do not force the user to know Remotion terminology. Translate intent into viable temporal and technical architecture. Ask at most three focused questions only when missing information would materially alter the result. If format or duration is unspecified, use the proposal phase to offer defensible alternatives instead of blocking.

## 2. Audit without mutation

Inspect working directory, repository structure, package manifest, lockfiles, package manager, Node/Bun runtime, React framework, existing Remotion packages/versions, compositions/IDs, scripts, assets, fonts, media inputs, environment configuration, output directories, and local browser/rendering capability.

Classify the environment as exactly one:
- `EXISTING_REMOTION_PROJECT`
- `EXISTING_REACT_PROJECT_WITHOUT_REMOTION`
- `NO_SUITABLE_PROJECT`

Do not mutate during this phase.

## 3. Ground source truth

Read `references/source-grounding.md`. Maintain an evidence ledger and classify material as `explicit`, `derived`, or `uncertain`. Only explicit and defensible derived material may appear normally. Qualify or omit uncertainty. Never fabricate material to fill duration or drama.

## 4. Choose output architecture

Read `references/output-architecture.md`. Choose one composition, coordinated compositions, format family, parameterized template, rendered-media package, motion system, Player, interactive page, video generator, render application, or a deliberate combination.

Prefer one semantic source of truth for related outputs. Recompose incompatible aspect ratios deliberately rather than cropping blindly.

Default proposal candidates when unspecified:
- landscape `1920×1080`
- vertical `1080×1920`
- square `1080×1080`
- portrait feed `1080×1350`
- `30 fps`

These are proposal defaults, not implementation mandates.

## 5. Build the temporal model

Before code/effects, identify central thesis, narrative beats, visual beats, hierarchy, required assets, transformations, reveals, causality, rhythm, tension/release, repeated motifs, camera states, interaction states, loops, audio events, caption events, and final takeaway.

Distinguish what must be seen, read, heard, felt, interactive, editable, parameterized, or rendered. Motion must reveal, connect, transform, emphasize, orient, or create useful rhythm.

## 6. Propose exactly three directions

Read `references/creative-direction.md`. Each direction must include:
1. Name
2. Creative thesis
3. Audience experience
4. Output package
5. Narrative structure
6. Temporal grammar
7. Visual language
8. Typography
9. Editing/camera language
10. Audio direction
11. Technical architecture
12. Reusable/parameterized elements
13. Serendipity move
14. Production risks
15. Tradeoff
16. Why it fits this source

Every pair must differ on at least three of: narrative structure, temporal rhythm, visual abstraction, editing grammar, camera behavior, typography behavior, audio strategy, interaction model, technical architecture, content density, emotional register, output package. If the three share the same timeline with different skins, redesign them.

## 7. Preserve serendipity

Each direction reserves one controlled, reversible, deterministic **serendipity move** emerging from the source: an unexpected metaphor, procedural transformation, spatial move, reactive type, audio-driven change, controlled 3D passage, generative texture, semantic morph, unusual compositing treatment, or subject-specific timing device.

It must support the source, remain isolated enough to remove, be previewed early, preserve readability, and survive render verification. Serendipity is disciplined discovery, not effect accumulation.

## 8. Mandatory frontend-design critique

Load the resolved frontend design skill and attack each direction for generic AI-video aesthetics, style detached from source, purposeless effects, weak hierarchy, poor typography, predictable clichés, noise, lack of identity, unearned complexity, weak interaction/web design, gimmicky serendipity, or architecture larger than the goal.

For each: `retain`, `refine`, or `replace`. Final set remains exactly three. Source truth, audience, platform, and user constraints outrank aesthetics.

## 9. Confirm

Present one approval package: interpreted objective; audience/context; assumptions/uncertainty; audited environment state; recommended output architecture; exactly three refined directions; expected deliverables; bootstrap/integration path; meaningful risks; recommendation; explicit request to select a direction or hybrid.

Do not scaffold/install/write implementation before approval. Material changes invalidate approval.

## 10. Bootstrap idempotently

After approval, read `references/project-bootstrap.md`.

- `EXISTING_REMOTION_PROJECT`: preserve package manager/framework/versions/IDs; install only genuinely missing packages; repair verified missing configuration only.
- `EXISTING_REACT_PROJECT_WITHOUT_REMOTION`: integrate Remotion locally using current official guidance; preserve host architecture; add only packages required by approved architecture.
- `NO_SUITABLE_PROJECT`: create a dedicated directory and use the current official Remotion scaffolder; the current documented npm default is `npx create-video@latest`; choose the minimum suitable template; never scaffold over unrelated nonempty content.

## 11. Ensure official Remotion Agent Skills

Check for `remotion-best-practices`. If missing, use current official installation guidance. Current Remotion docs document `npx skills add remotion-dev/skills`; project workflows may also expose `npx remotion skills add`. Use the command appropriate to current docs/environment. Verify discovery after installation, then load `remotion-best-practices`.

## 12. Capability probe

Installation success is not enough. Prove the toolchain works before full implementation.

Rendered composition probe:
1. dependencies resolve
2. compositions can be discovered/bundled
3. Studio or equivalent preview starts when applicable
4. one representative still renders
5. one short representative motion segment renders
6. artifact exists and is readable
7. representative output is inspected when supported

Player-only probe: application build/start, Player mount, playback, prop update, responsive sizing.

If a probe fails, classify the failed layer, repair minimally, and rerun before production.

## 13. Load Remotion best practices

Load `remotion-best-practices` only after bootstrap/probe. Follow it for current Remotion mechanics. If technical details conflict, official Remotion guidance wins; the approved direction still governs creative intent.


## 14. Start the Studio observer

As soon as the approved project has at least one valid previewable composition, make Remotion Studio available when the local environment supports it.

Studio is the user's live observation window into autonomous implementation. It is not an incremental approval gate.

Classify Studio state as exactly one:

- `STUDIO_VISIBLE`
- `STUDIO_RUNNING_NOT_EXPOSED`
- `STUDIO_UNAVAILABLE`

### STUDIO_VISIBLE

When Studio can be reached by the user:

- start or retain the local Studio process
- report the local URL clearly
- identify the composition(s) currently available
- keep Studio running throughout implementation when practical
- continue building without waiting for user feedback
- do not ask for confirmation after every visual increment

### STUDIO_RUNNING_NOT_EXPOSED

When Studio can run but the execution environment cannot expose its localhost interface to the user:

- keep it available when useful to the local toolchain
- report that the process exists but the UI is not user-reachable
- continue autonomously
- rely on stills, short renders, and programmatic verification for deliverable checks

### STUDIO_UNAVAILABLE

When Studio cannot run:

- record the reason
- continue only if the approved output can still be built and verified through the available render/Player pipeline
- use representative stills and short renders as observation artifacts
- do not treat Studio absence alone as fatal when rendering remains valid

### Observation semantics

The agent must distinguish capability from observation:

- starting Studio does not mean Studio was visually inspected
- reporting a URL does not mean the user opened it
- a non-vision model must never say a composition "looks balanced", "looks good", or similar based on Studio
- programmatic geometry, text measurement, timing, typechecking, render success, and deterministic checks remain mandatory
- when the user comments on what they see in Studio, treat that feedback as authoritative visual evidence for the requested revision

### Autonomous build behavior

After Studio state is reported:

- continue implementation to completion
- build in coherent internal increments
- do not pause for visual feedback
- do not reopen the three-direction phase
- do not require approval for ordinary implementation choices inside the approved direction
- stop only for a genuine blocker, material scope conflict, or explicit user interruption

Prefer reversible implementation until the major visual system is established:

- centralized design tokens
- centralized timing constants
- reusable motion primitives
- isolated experimental effects
- modular serendipity move
- semantic scene components

This keeps end-of-run revisions cheap without constraining creative exploration.

## 15. Build deliberately

Prefer design tokens, semantic scene components, shared typography, reusable motion/transition primitives, central timing constants, explicit composition metadata, typed props, validated schemas, stable asset paths, isolated experiments, and meaningful composition IDs.

Avoid monoliths, scattered magic frames, duplicated constants, uncontrolled random values, unstable network dependencies, hardcoded content that belongs in props, browser-time nondeterminism, unnecessary packages, or unreproducible effects.

## 16. Design time

Read `references/temporal-grammar.md`. Design at composition, scene, and element scales. Do not animate every property. Stillness is part of rhythm. Important content must remain perceivable long enough. Transitions connect semantic states rather than hiding cuts.

## 17. Default creative system

Read `references/black-ice-motion-system.md` when style is unspecified. The default draws from Neuromancer, Shadowrun decker culture, black ice, hostile networks, terminal noir, urban technical decay, illicit infrastructure, analog intelligence over digital systems, cybernetic ritual, and controlled corruption.

It is a launch point, not a rigid template. Do not collapse automatically into vaporwave, synthwave, cyan/magenta glow, code rain, fake terminals, meaningless glitch, or generic sci-fi HUDs. Subject-specific color, imagery, 3D, photography, shaders, materials, and unexpected techniques are welcome when stronger.

## 18. Typography and readability

Typography is temporal geometry. Ensure text fits throughout animation, line breaks are deliberate, reading time is sufficient, hierarchy survives platform size, captions stay safe, animated type remains readable, mobile formats scale appropriately, and font loading is deterministic. Measure according to current Remotion best practices. Do not solve overcrowding by shrinking type.

## 19. Media

Read `references/media-system.md` when media is used. Establish provenance, real paths/URLs, decode compatibility, dimensions/duration, crop behavior, deterministic loading, and placeholder status. Never pretend placeholders are final.

Voice generation requires an approved/source-grounded script, authorized voice source, known generation method, and available credentials. When speech exists, plan captions unless explicitly excluded.

## 20. Player and web

Read `references/web-experiences.md` when interactive web output is requested. Use Remotion for temporal composition and the host React app for routing/forms/auth/persistence/application state. Keep render-safe composition state separate from web-only state. Do not expand unrelated website scope.

## 21. Preview early

Use the fastest feedback loop: validate project → preview → inspect representative frames → render critical stills → render short/reduced preview → inspect timing/type/composition/media/serendipity → repair → final render → final inspection.

Representative moments: opening, first reveal, densest frame, major transition, serendipity move, synthesis/climax, final frame. Inspect every requested aspect ratio independently.

## 22. Render intentionally

Choose current supported outputs based on target platform, transparency, compatibility, file size, quality, encoding time, alpha support, upload limits, and downstream editing. Keep rendered output separate from source assets. Confirm version-sensitive codec/container support through official Remotion guidance.

## 23. Multi-format coherence

Preserve one creative thesis, semantic typography/color, key narrative beats, and audio identity. Recompose each aspect ratio, adapt pacing where required, move captions/safe-area content, and verify each format independently. A vertical short is not a crop of a landscape master.

## 24. Large-project batching

Batch long/complex work by narrative section, composition, format, component family, or web-versus-render core. One approved direction governs everything. Do not reopen the three-direction phase per batch. Share tokens/primitives, preview each batch, inspect cross-batch transitions, and run a final project-wide verification.

## 25. Ōtsumi trace

Every primary creative output should contain a subtle maker's trace unless white-label output is explicitly requested. Use a restrained end card, diegetic terminal credit, final-frame inscription, quiet footer, interface label, or metadata-visible credit.

Format: `<output-specific punchline> — Ōtsumi`

It must derive from the work's thesis, remain short and unique, stay subordinate, and never become a persistent intrusive watermark or generic cyberpunk slogan.

## 26. Verify and deliver

Read `references/verification.md`. Use `CHECK → RECORD DEFECT → REPAIR SOURCE → RECHECK → RERENDER`. Never patch only the export while source remains broken.

Deliver only artifacts that actually exist: editable source project, composition map, local run instructions, renders, stills/thumbnails, variants, Player/web app, parameter schema, asset inventory, concise architecture summary, verification report, and disclosed uncertainty.


## 27. Post-delivery revision mode

After the first complete delivery, user feedback is normally an edit pass, not a new creative-direction cycle.

Classify requested changes as exactly one:

### LOCAL_REVISION

Use for focused changes such as timing, typography, color, one effect, one transition, one scene, crop, caption, audio, asset replacement, or tuning the serendipity move.

Behavior:

- edit the existing approved project directly
- preserve architecture and unaffected scenes
- keep or restart Studio when practical
- rerender affected representative ranges first
- rerender final affected outputs
- rerun applicable verification
- do not produce three new directions
- do not request a new creative approval gate

### STRUCTURAL_REVISION

Use when the user materially changes scene order, narrative section, overall duration, several connected scenes, output variants, interaction flow, or composition boundaries.

Behavior:

- preserve the approved creative system where possible
- revise only the affected temporal model and architecture
- update dependent scenes and transitions
- rerun applicable preview/render verification
- do not restart three-direction exploration unless the requested change invalidates the creative thesis

### CREATIVE_RESET

Use only when the user explicitly rejects or replaces the core creative direction, audience experience, or output concept.

Behavior:

- return to `MODEL`
- develop exactly three new directions
- rerun frontend-design critique
- request explicit approval
- then resume implementation

Do not escalate a local edit into a creative reset.

Do not reinstall Remotion or recreate the project during revision unless a verified dependency or environment change requires it.

## Completion lock

Complete only when all applicable conditions pass:
- source claims are grounded
- audience/objective are explicit
- architecture fits the request
- exactly three materially different directions were developed
- frontend-design was loaded/applied
- user explicitly approved
- bootstrap/integration succeeded
- `remotion-best-practices` is installed and loaded
- Studio observer state was classified and reported when Studio was applicable
- no visual inspection was claimed without actual visual inspection capability
- capability probes passed
- dependencies remain local/compatible
- compositions are registered correctly
- rendered animation is deterministic and frame-driven
- text fits and remains readable
- real assets load/decode
- requested audio/captions synchronize
- every aspect ratio was deliberately composed
- Player/web behavior works when requested
- representative frames/previews/final outputs were actually inspected when supported
- no known visual/timing/media/application/render defect remains
- Ōtsumi trace is present unless white-label
- editable source and requested deliverables exist

The acceptable result is an authored temporal experience the user can run, edit, render, understand, and trust.
