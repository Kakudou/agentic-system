# Verification

Verification is layered; rendering success alone is not proof of quality. Every check is `PASS`, `FAIL`, `NOT AVAILABLE`, or `NOT APPLICABLE`. Any `FAIL` blocks final delivery.

## Approval/dependencies
Exactly three directions; frontend-design critique; explicit approval; no unapproved material change; `remotion-best-practices` loaded; capability probe passed.

## Source
Required content present; unsupported claims absent; derivations defensible; uncertainty qualified; quotes/numbers verified; asset ledger truthful; placeholders disclosed.

## Project
Dependencies resolve; typecheck/lint/build pass where configured; compositions discover; IDs unique; props/schemas valid; package manager/lockfile preserved; no unnecessary global installs.

## Determinism
No uncontrolled randomness, wall-clock state, async race, unstable network timing, or Player-only state leaking into render-safe composition. Use seeded controlled inputs where necessary.

## Metadata
For each composition: ID, width, height, fps, duration, props, dynamic metadata if applicable, intended output. Do not infer dimensions from CSS.

## Typography/layout
Inspect clipping, overflow, line breaks, type size, contrast, reading time, font weights/fallback, captions, safe areas, masks, crop, camera framing, and every aspect ratio independently.

## Timing/motion
Entrance, stable comprehension, exit, transition, loop boundary, ending, rapid cuts, dead zones. Motion must have purpose; repeated behaviors form grammar; effects/camera/glitch/serendipity do not obscure content.

## Assets
Real paths resolve; decode succeeds; metadata/crop/trim correct; source files preserved; placeholders correct.

## Audio
Track exists; trim/levels/fades/ducking correct; voice intelligible; effects synchronized; no clipping; ending intentional. Actual listening is required for `PASS`; otherwise `NOT AVAILABLE`.

## Captions
Transcript/timing/segmentation/spelling/technical terms/safe areas/legibility correct against final audio.

## Player/web
App builds/starts; Player mounts; playback/seek/props/resize work; invalid props/loading/error states handled; render-safe code separated; basic keyboard/mobile behavior works.

## Studio observer state
When Studio is applicable:

- observer state is classified as `STUDIO_VISIBLE`, `STUDIO_RUNNING_NOT_EXPOSED`, or `STUDIO_UNAVAILABLE`
- a reachable URL is reported when user exposure is available
- unavailable exposure is reported accurately
- implementation continues autonomously rather than waiting for incremental approval
- Studio startup is not misreported as visual inspection
- a non-vision model makes no unsupported aesthetic claims based on Studio
- user visual feedback, when provided, is treated as authoritative revision input

## Representative frames
Inspect opening, first major reveal, densest frame, major transition, serendipity move, synthesis/climax, final frame for composition, text, crop, hierarchy, color, assets, browser defaults, defects.

## Preview
Produce quickest useful preview for motion output; inspect pacing, transitions, motion, camera, typography, media, audio if present, and serendipity; repair source and rerender.

## Final output
Command completes; file exists/nonzero; format, duration, dimensions, audio, transparency match; artifact opens in available viewer/player. Exit code alone is not verification.

## Multi-format
Same thesis/semantic system/beats/audio identity; deliberate recomposition; correct safe areas/captions; no crop artifacts; each format authored for platform.

## Ōtsumi trace
When not white-label: present, thesis-specific, unique, subordinate, nonpersistent. When white-label: absent.

## Repair loop
`CHECK → RECORD → REPAIR SOURCE → RECHECK → RERENDER`.

After timing change recheck transitions/captions/audio/duration/final frame. After typography change recheck formats/masks/Player/captions. After asset change recheck crop/decode/color/load.

## Revision verification

For post-delivery changes:

- request was classified as `LOCAL_REVISION`, `STRUCTURAL_REVISION`, or `CREATIVE_RESET`
- local revisions did not unnecessarily restart creative exploration
- unaffected scenes and architecture were preserved
- affected representative ranges were rerendered
- dependent timing, audio, captions, and transitions were rechecked
- final affected outputs were regenerated
- a creative reset reran proposal, critique, and approval
- project/bootstrap was not recreated without a verified need

## Final report
Use concise states for source grounding, project/dependencies, capability probe, Studio observer, composition metadata, determinism, typography/layout, timing/motion, assets, audio, captions, Player/web, still inspection, preview inspection, final output inspection, multi-format coherence, revision verification when applicable, and Ōtsumi trace. Completion requires zero `FAIL` states.
