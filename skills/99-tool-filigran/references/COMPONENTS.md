# Components and Icons

## Component categories currently documented

The public component library includes components across:

### Core

- Badge
- Button
- Gradient Button
- Icon Button
- Card

### Feedback

- Alert Dialog
- Toast

### Data display

- Avatar
- Datatable
- Tooltip

### Navigation

- Breadcrumb
- Tabs

### Forms

- Checkbox
- File Input
- Input
- Multi Select
- Select
- Tag Input
- Textarea

### Other / overlays / utilities

- Accordion
- Autoform
- Carousel
- Color Picker
- Command
- Dialog
- Dropdown Menu
- Label
- Popover
- Separator
- Sheet
- Skeleton
- Combobox
- and additional documented utilities/components in the live catalog.

Check the live docs because the library changes over time.

## Button semantics

The official Button documentation describes variants including primary/default, secondary, destructive, outline, ghost/link-compatible behavior, plus compound color variants. Current examples also show tertiary and link-specific variants.

Use the most semantically appropriate canonical variant instead of styling prominence manually.

Destructive actions must remain visibly destructive and should not be restyled into a brand-blue primary action.

## GradientButton

This is a **specialized** action treatment, not the default button style.

Documented behavior:

- animated gradient border;
- optional gradient text;
- default blue → turquoise gradient variables;
- gradient direction reverses on hover;
- inherits base Button sizing/behavior.

Use it for an action that deserves special emphasis, not as the universal CTA.

## Badge semantics

Documented variants include:

- default;
- secondary;
- warning;
- destructive;
- outline.

Badges communicate compact state/category information. Do not treat warning/destructive as decorative brand chips.

## Card anatomy

The canonical Card composition includes:

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

Prefer this structure where it matches the content rather than inventing a visually similar but incompatible container.

## Icon library

The design system includes a substantial Filigran icon catalog with:

- standard navigation/action icons;
- domain objects such as Threat Actor, Campaign, Indicator, Vulnerability, Malware, Report, Infrastructure, etc.;
- Filigran/product marks including `LogoFiligranIcon`, XTM/OpenCTI/OpenAEV/OpenGRC-related icons;
- loading and system icons.

For product UI, check the catalog before importing another icon family.

## Frontend implementation priority

1. Existing product component already in the target repository.
2. Current `@filigran/ui` component.
3. Composition of Filigran UI primitives.
4. Local extension styled with current design tokens.
5. Custom component only when needed.

This order protects consistency and future maintainability.
