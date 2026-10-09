# Black Ice Design System

## 1. Design thesis

The system should feel like a **working instrument under hostile signal conditions**: precise underneath, corrupted at the surface, confident rather than noisy.

The clean layer is engineered. The damage layer is atmospheric.

The result should evoke a nocturnal technical environment: dense infrastructure, cold architecture, live green signal, rare orange heat, and blue as the chassis tying everything together.

Avoid cosplay UI. The goal is not to recreate a game screen; it is to translate the emotional grammar of neon-dystopian interfaces into an original, reusable visual language.

## 2. Color system

### Core semantic palette

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Brand / structural | TARDIS Blue | `#003B6F` | Frames, key rules, structural accents, major headings, selected architecture |
| Active / live | Lightsaber Green | `#00FF66` | Active states, confirmations, cursors, live telemetry, selected data, energized accents |
| Warning / heat | Lightsaber Orange | `#FF8C00` | Warning, anomaly, destructive emphasis, heat, caution, urgent state |
| Base | Deep Night | `#0A0F1C` | Main dark background |
| Deepest base | Black Ice | `#04080D` | Depth, negative space, deep panels |
| Surface | Gunmetal | `#1A2230` | Panels, elevated surfaces, secondary containers |
| Cool neutral | Fog Gray | `#C9D1D9` | Primary readable text on dark surfaces |
| Bright neutral | Signal White | `#F4F7FA` | Highest contrast text, highlights, logo variant |
| Muted text | Ash Blue | `#8796A5` | Secondary copy, metadata, captions |

### Dominance

Treat the palette semantically rather than as a strict pie chart, but a healthy visual balance is usually:

- Dark neutrals: the majority of the field.
- Blue: the dominant chromatic structure.
- Green: focused active energy.
- Orange: rare counter-signal.
- White/fog: readability and sharp contrast.

Blue should be more common than green or orange, but not necessarily brighter than them. The brighter accents win attention; blue wins territory and repetition.

### Derived blues

You may derive lighter or darker blues for hierarchy, but keep `#003B6F` unmistakably present. Derived blues should stay cool and disciplined. Do not drift into generic cyan unless a temporary effect or data visualization needs it.

### Color semantics

- **Blue** = identity, structure, navigation, chassis, continuity.
- **Green** = alive, active, selected, confirmed, transmitting, executing.
- **Orange** = hot, anomalous, risky, urgent, destructive, attention required.
- **White/Fog** = content, legibility, precision.
- **Gunmetal/Black** = depth, hierarchy, silence.

Do not use green and orange arbitrarily. The semantic distinction is part of the brand.

## 3. Surface language

Use dark surfaces with restrained separation:

- Near-black canvas.
- Slightly lighter gunmetal panels.
- Hairline strokes rather than heavy card shadows.
- Occasional inset lines or double strokes.
- Very subtle blue/green ambient spill at edges.
- Texture lives mostly in the top artifact layer, not baked aggressively into every component.

Avoid excessive frosted glass. Transparency can exist, but it should feel like a technical overlay rather than a glossy consumer dashboard.

## 4. Shape grammar

### Preferred

- Clipped corners.
- 45-degree or shallow diagonal cuts.
- Notched panel headers.
- Asymmetric frames.
- Corner brackets.
- Interrupted borders.
- Stepped line segments.
- Slotted labels.
- Slanted tabs.
- Geometric masks.
- Thin technical rules.
- Controlled overlaps.

### Avoid by default

- Large soft radii everywhere.
- Pill-shaped everything.
- Bubbly cards.
- Floating gradient spheres.
- Generic neon borders around every object.
- Decorative hexagons with no information role.
- Fake terminal text that carries no meaning.

### Radius guidance

Default toward `0–4px` equivalent visual radius. Larger radii require functional or subject-specific justification.

## 5. Layout and composition

The preferred composition is **asymmetric but engineered**.

Use a clear underlying grid, then break it intentionally:

- A large structural frame may stop short of one edge.
- A label can protrude from a panel.
- A hero can bias left while telemetry occupies a narrow right rail.
- A horizontal rule can fracture into a diagonal notch.
- A full-bleed image can be interrupted by a technical crop or overlay.

Do not create chaos. The eye should always know where to go next.

### Density

Density should follow the subject:

- Operational dashboards can be dense.
- Brand pages should breathe.
- Documents need quiet reading zones.
- Slides need one dominant idea per slide.
- Video can alternate dense moments with clean pauses.

The visual language is compatible with both sparse and dense layouts; do not equate “cyberpunk” with clutter.

## 6. Typography

Use three roles when the medium supports it.

### Display role

Character: condensed or squared grotesk, assertive, technical, preferably uppercase for short headings.

Behavior:

- Tight vertical rhythm.
- Moderate to wide tracking for small all-caps labels.
- Large headlines may use tighter tracking.
- Consider selective italics, width contrast, or cut-in lines.

Possible open-source directions include families such as Barlow Condensed, Rajdhani, Oxanium, Chakra Petch, or other similarly technical faces. These are **directions, not mandatory fonts**. Choose to fit the actual artifact and subject.

Do not mimic proprietary Cyberpunk 2077 title lettering.

### Body role

Character: clean, modern sans-serif built for reading.

Priorities:

- Comfortable x-height.
- Strong distinction between weights.
- Clear punctuation.
- Excellent legibility on dark surfaces.

Keep body copy mostly neutral. The display face carries the aggression; the body face carries trust.

### Utility / data role

Character: monospace or square technical face.

Use for:

- IDs.
- timestamps.
- status.
- terminal/data snippets.
- measurements.
- labels.
- code.
- navigation microcopy when appropriate.

Do not render long prose in monospace unless the artifact is intentionally terminal-native.

## 7. Type hierarchy

A useful starting relationship:

- Hero / title: dominant, condensed, high contrast.
- Section title: strong but quieter than hero.
- Eyebrow / label: uppercase utility face, expanded tracking.
- Body: calm neutral sans.
- Metadata: compact mono, muted gray or green when live.

Use blue for structural headings, white/fog for core content, green for active data, orange for warnings.

## 8. Borders, rules, and framing

Framing is a primary visual signature.

Use:

- 1px-equivalent blue lines.
- partial borders.
- tiny diagonal cuts.
- double-rule fragments.
- brackets that hug data or media.
- short green energized segments on an otherwise blue frame.
- orange interruption only where the content itself is anomalous.

A frame may be incomplete. In fact, incomplete framing often feels more technical than a fully boxed rectangle.

## 9. Icons and symbols

Use geometric, monoline, technical icons.

Preferred characteristics:

- Consistent stroke weight.
- Square or angled terminals.
- Minimal fill.
- Clean silhouettes.
- Semantically recognizable before stylistic decoration.

Avoid mixing unrelated icon families. Do not make every icon glow.

## 10. Photography and imagery

When using photography or rendered imagery:

- Favor cool shadows and deep blacks.
- Keep saturation controlled.
- Allow green practical lights or interface reflections.
- Use orange as a heat source or anomaly.
- Preserve recognizable skin tones and important subject colors when people are present.
- Crop assertively, with technical frames or asymmetric masks.
- Add surface damage through the top artifact layer rather than destroying the source image itself.

Possible treatments:

- selective desaturation.
- cool split-toning.
- subtle scanlines.
- directional grain.
- occasional RGB separation in narrow bands.
- edge blooming around practical lights.

Avoid making every image look like a noisy VHS filter.

## 11. Data visualization

Map semantics consistently:

- Blue = baseline/system/reference series.
- Green = active/current/healthy/selected series.
- Orange = threshold/anomaly/risk/exception.
- Gray = historical/inactive/background context.

Use grid lines sparingly. Favor thin rules and high contrast labels. Never rely on color alone for status; pair color with shape, label, pattern, or icon.

## 12. Controls and interaction states

Where interaction exists:

- Default: blue frame or neutral surface.
- Hover: controlled green edge activation, underline, cursor trail, or small brightness increase.
- Focus: clear high-contrast visible ring or bracket; never hide keyboard focus.
- Active/selected: green becomes semantically dominant within that control.
- Warning/destructive: orange with label/icon confirmation.
- Disabled: gunmetal + muted gray, low glow.

Avoid gratuitous neon hover on every element. Reserve the most dramatic interaction for the signature moment.

## 13. Motion language

Motion should feel electronic, not floaty.

Preferred:

- hard cuts with short eased settling.
- directional wipes.
- clip-path reveals.
- 1–3 frame signal skips.
- brief x/y displacement.
- scanline passes.
- segmented line draws.
- data lock-on / targeting behavior.

Avoid:

- endless bouncing.
- springy consumer-app motion everywhere.
- slow generic gradient drift as the only idea.
- constant full-screen chromatic aberration.

See `references/GLITCH-LAYER.md` for the always-present top layer.

## 14. Texture

Texture is subtle and layered:

- fine grain.
- sparse dust/speckle.
- hairline scanlines.
- mild digital noise.
- imperfect signal bands.
- rare compression artifacts.
- occasional offset fragments.

The clean design must still exist underneath. If the user cannot mentally remove the damage and see a coherent layout, the texture is too strong.

## 15. Copy and voice inside designed artifacts

Copy should sound precise, terse, and useful rather than pseudo-hacker theatrical by default.

Prefer:

- specific verbs.
- short labels.
- real status language.
- concrete descriptions.

Flavor can appear in headlines or signature moments, but controls and instructional copy should remain immediately understandable.

## 16. Accessibility floor

- Preserve sufficient contrast for body text.
- Do not use glow as the only contrast mechanism.
- Do not encode state with color alone.
- Keep critical content outside decorative glitch bands.
- Respect reduced-motion preferences where the platform supports them.
- Avoid rapid full-screen flashing.
- Maintain readable minimum type size for the medium.
- Provide captions/subtitles for video when speech or essential audio is present.
- Ensure keyboard focus and touch targets when interactive.

## 17. Anti-patterns

Reject these unless the actual subject strongly justifies them:

- Generic black + acid-green “hacker” theme with no blue identity.
- Magenta/cyan synthwave replacing the requested green/orange system.
- Huge neon glow around everything.
- Pure black backgrounds with tiny low-contrast gray text.
- Rounded SaaS cards with a cyberpunk wallpaper behind them.
- Fake code blocks used only as decoration.
- Excessive scanlines over body copy.
- Random numbers, coordinates, or IDs with no meaning.
- Exact imitation of Cyberpunk 2077 branding, title lettering, screenshots, or UI compositions.

## 18. Quality test

Ask:

1. If the glitch layer vanished, would the artifact still be beautifully designed?
2. If all neon vanished, would hierarchy still be clear?
3. Does blue define the system more than green or orange?
4. Does every green/orange use communicate state or emphasis?
5. Is the geometry subject-aware rather than decorative cosplay?
6. Is there one memorable signature moment rather than twelve competing tricks?
7. Can a user still read and operate it comfortably?

If any answer is no, revise before delivery.
