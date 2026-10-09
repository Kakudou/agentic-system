# Typography and Spacing

## Canonical typography roles

The official Filigran UI docs expose semantic typography classes rather than requiring consumers to recreate a raw type scale.

### `txt-jumbo`

Use for the highest product-level display emphasis where the component/system already expects it.

### `txt-title`

Primary page/section title role.

### `txt-subtitle`

Secondary heading / explanatory title role.

### `txt-category`

Category/eyebrow grouping label.

### `txt-tab`

Tab titles.

### `txt-container-title`

Titles inside containers/cards/panels.

### `txt-default`

Default content, general text, and button text.

### `txt-sub-content`

Sub-content, subtext, tooltips, tags, graph titles, and breadcrumbs.

### `txt-mini`

Very small supporting text. Use sparingly and preserve accessibility.

## Product UI rule

If the library classes are available, use them instead of recreating approximations with arbitrary Tailwind font sizes.

If the design system implementation has evolved, prefer the current installed source over this list.

## Marketing translation

The live corporate site uses a simpler editorial hierarchy than a dense product screen:

- large clear hero statement;
- concise supporting copy;
- bold metric numerals;
- strong section headings;
- compact category labels;
- readable body text with generous breathing room.

For non-web media, reproduce **the hierarchy**, not the literal CSS class names.

Do not claim a specific corporate font family unless it is available from official brand assets or current source code.

## Canonical spacing scale

The official documentation defines:

| Token | rem | px at 16px root |
| --- | ---: | ---: |
| xxs | 0.125rem | 2px |
| xs | 0.25rem | 4px |
| s | 0.5rem | 8px |
| m | 0.75rem | 12px |
| l | 1rem | 16px |
| xl | 1.5rem | 24px |
| xxl | 2rem | 32px |

Documented usage includes utilities such as `p-xxs`, `gap-xs`, `h-m`, `w-l`, `mt-xl`, and `max-w-xxl`.

## Spacing behavior

For product UI:

- build rhythm from these tokens;
- avoid arbitrary 5px/13px/27px gaps unless a component explicitly requires them;
- align repeated controls and list rows consistently;
- maintain touch/click target requirements even if visual padding is compact.

For corporate/marketing:

- the token scale can guide internal component spacing;
- section spacing may be larger than `xxl` and should follow the chosen medium/layout rather than forcing product-density tokens into a hero page or slide deck.
