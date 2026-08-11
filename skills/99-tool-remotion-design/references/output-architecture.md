# Output Architecture

Choose the simplest architecture that satisfies the real goal while preserving needed reuse.

## Classes
- **Rendered media**: one-off video, trailer, reel, explainer, title, overlay, still/thumbnail.
- **Coordinated compositions**: independent sequences sharing tokens/assets/motion grammar.
- **Format family**: one semantic content model with deliberate aspect-ratio-specific compositions.
- **Parameterized template**: typed validated props with meaningful user controls and deterministic layout.
- **Motion-design system**: reusable typography/motion/transition/diagram primitives.
- **Player experience**: interactive preview/playback inside React.
- **Video application**: UI + Player + validated props + rendering workflow/job state.

Do not introduce server/cloud infrastructure unless explicitly requested.

## Decision test
Ask: file or experience? one-off or reusable? variants? multiple aspect ratios? interactive preview? other users editing content? render location? existing host app?

Prefer fewer moving parts when two architectures solve the same goal.

## Default proposal formats
Landscape `1920×1080`, vertical `1080×1920`, square `1080×1080`, portrait feed `1080×1350`; verify actual platform needs. Never blind-crop a master.

## Web boundary
Remotion owns temporal composition/playback/rendering. Host React owns navigation, forms, auth, persistence, routing, responsive page layout, and application state.
