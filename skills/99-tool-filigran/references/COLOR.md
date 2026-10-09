# Color and Gradient Guidance

## Canonical Filigran UI palette families

The official color documentation exposes:

- gray 50–1000, including gray-150;
- darkblue 100–900;
- blue 100–900;
- turquoise 100–900;
- green 100–900;
- red 100–900;
- orange 100–900;
- yellow 100–900.

For exact product work, **resolve the current value from the installed package or live docs**. The public rendered page does not print every swatch's hex value in text, so this skill intentionally does not invent missing values.

## Verified color examples

The official colors documentation currently includes a contrast demonstration using:

- `#009474`
- `#00020c`

with a reported contrast ratio of 18.85 in that example.

Treat these as **verified example values**, not as permission to redefine every semantic token around them.

## Documented gradient component

`GradientButton` defaults to:

- start: `hsl(var(--blue-default))`
- end: `hsl(var(--turquoise-300))`
- inner background: `hsl(var(--background))`

It can optionally apply the gradient to text and reverses gradient direction on hover.

This blue → turquoise relationship is a useful canonical clue for special emphasis, especially around AI or premium/hero actions, but it should not become the border treatment of every component.

## Observed corporate website calibration

Current official corporate materials repeatedly use:

- saturated electric blue;
- cyan/turquoise highlights;
- indigo/violet transitional regions;
- white typography over dark/navy or saturated gradient fields;
- dark navy backgrounds around product imagery and premium content.

For marketing output, use these relationships visually. If exact brand hex values are required, inspect the current official asset/CSS rather than sampling or guessing from screenshots.

## Semantic use

### Blue / darkblue

Use for:

- brand identity;
- primary actions when canonical styles specify it;
- links/selection/navigation;
- structural emphasis;
- major corporate gradient fields.

### Turquoise

Use for:

- gradient completion;
- secondary energy/highlight;
- selected technical accents;
- product-flow emphasis.

### Green

Use for positive/healthy/confirmed states unless a product-specific semantic mapping says otherwise.

### Red

Use for destructive/error/critical states.

### Orange / yellow

Use for warning, caution, pending/attention, or severity semantics as appropriate to the product.

### Gray

Carry most product surfaces, text hierarchy, borders, disabled states, and neutral data context.

## Do / don't

Do:

- use semantic variables/classes in product UI;
- preserve dark/light theme behavior;
- make gradients purposeful and limited;
- pair status color with labels/icons/shapes;
- check contrast.

Do not:

- guess undocumented palette hex values;
- use all palette families decoratively;
- turn status red/orange/yellow into branding accents;
- apply blue-turquoise gradients to every card or heading;
- use color alone to communicate severity.
