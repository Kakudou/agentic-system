# Web Experiences

Remotion supplies temporal compositions and Player/rendering. The host React app owns ordinary application concerns.

## Boundary
Render-safe composition: visual composition, deterministic props, timing, media, frame-derived state. It must not depend on arbitrary webpage runtime state that cannot exist during render.

Host app: routing, forms, navigation, auth, persistence, network mutations, responsive layout, Player controls, parameter editing, render-job requests, user feedback.

## Player
Use current official Player APIs; preserve aspect ratio; responsive sizing; validated props; loading/error states; test play/pause/seek, prop changes, resizing, and accessibility. Do not assume render-only behavior equals interactive behavior.

## Parameter editors
Expose meaningful creative inputs (title, subtitle, asset, dataset, theme, duration mode, speaker, highlight), not raw frame indices or internal easing knobs. Validate before preview/render.

## Interactive explainer
Separate webpage state, composition props, and states intended for rendered output. Do not claim interactive-only states will render identically without designing them.

## Render-request UI
Separate UI from render service, validate props, handle job/failure/output state, avoid duplicate requests, never expose server credentials. Do not provision cloud rendering without explicit approval.

## Responsive/accessibility
Responsive Player container, preserved ratio, usable mobile controls/forms, keyboard access, focus, semantic controls/labels, contrast, reduced-motion handling for the web shell, captions/transcript where possible.

## Error states
Handle missing composition, invalid props, unavailable media, Player load failure, render request failure, unsupported browser behavior. Do not expose raw production stack traces.

## Styling
Support the approved direction without turning every control into a fake terminal or expanding into unrelated web design.
