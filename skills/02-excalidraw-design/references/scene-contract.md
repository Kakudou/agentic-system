# Excalidraw Scene Contract

Use this reference only after approval, before creating or editing scene data.

The deliverable is an editable `.excalidraw` plaintext JSON scene.

## Construction priority

Use the safest available route:

1. **Existing scene edit**: preserve and extend the scene's current fully qualified element records.
2. **Installed Excalidraw API**: if `@excalidraw/excalidraw` is already available, generate skeleton elements and convert them with the current `convertToExcalidrawElements()` API before serialization.
3. **Native JSON authoring**: write a conservative scene using the contract below and validate it by loading/rendering when possible.

Do not install packages, modify project dependencies, or introduce permanent generation scripts unless the user explicitly asks.

Do not write simplified skeleton objects directly as final scene elements unless they have been converted or the target loader has been verified to restore them correctly.

## Top-level contract

A local scene has this structure:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [],
  "appState": {
    "viewBackgroundColor": "#0B0E11"
  },
  "files": {}
}
```

Requirements:

- `type` is `excalidraw`
- `version` is numeric (currently `2`)
- `elements` is an array
- `appState` is an object
- `files` is an object
- `sceneVersion` is optional (scene-level reconciliation string, e.g. `"1"`)
- all JSON is strict: no comments, trailing commas, `NaN`, or infinity

Preserve additional top-level fields when editing an existing scene.

## Native element discipline

Existing scenes may contain fields not listed here. Preserve them.

For new elements:

- use unique stable IDs
- use finite numeric coordinates and dimensions
- keep width and height positive
- use supported Excalidraw element types
- preserve the target scene's current record shape whenever one exists
- generate nonzero seeds/nonces when those fields are required by the chosen route
- always include an `index` string for z-ordering
- always include an `updated` epoch-millisecond timestamp
- never reuse a deleted element's ID for a different semantic object

### Common fully qualified element fields

Every element MUST include all of these shared fields:

```json
{
  "id": "service-auth",
  "type": "rectangle",
  "x": 120,
  "y": 180,
  "width": 240,
  "height": 120,
  "strokeColor": "#D6D1C7",
  "backgroundColor": "#151A1F",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roundness": { "type": 3 },
  "roughness": 1,
  "opacity": 100,
  "angle": 0,
  "seed": 123456789,
  "version": 1,
  "versionNonce": 987654321,
  "index": "a1",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1750000000000,
  "link": null,
  "locked": false
}
```

This is a field contract, not a copy-paste template. Add or preserve current fields required by the target Excalidraw version. Never delete unknown fields merely because they are absent here.

### Critical fields

| Field | Required | Description |
|---|---|---|
| `index` | **Yes** | Fractional ordering key for z-order. Use sequential strings like `"a1"`, `"a2"`, `"b0"`, `"b1"`, etc. Elements listed earlier in the array get earlier index values. |
| `updated` | **Yes** | Epoch millisecond timestamp (e.g. `1750000000000`). Never use `0`. |
| `boundElements` | **Yes** | Use `null` when no elements are bound, or an array of `{"id": "...", "type": "arrow"}` / `{"id": "...", "type": "text"}` objects. Never use `[]` for empty — use `null`. |
| `frameId` | **Yes** | Use `null` when the element is not inside a frame. |
| `groupIds` | **Yes** | Use `[]` for elements not in a group. |
| `seed` | **Yes** | Nonzero integer for stable rendering. |
| `version` | **Yes** | Per-element version counter, start at `1`. |
| `versionNonce` | **Yes** | Nonzero integer nonce for reconciliation. |

## Text

A text element requires at least a unique ID, position, dimensions, style, and text metadata appropriate to the target scene.

```json
{
  "id": "text-title-01",
  "type": "text",
  "x": 164,
  "y": 128,
  "width": 420,
  "height": 72,
  "strokeColor": "#D6D1C7",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roundness": null,
  "roughness": 1,
  "opacity": 100,
  "angle": 0,
  "seed": 382940115,
  "version": 1,
  "versionNonce": 740191222,
  "index": "a4",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1750000000000,
  "link": null,
  "locked": false,
  "fontSize": 32,
  "fontFamily": 1,
  "text": "Quarterly Architecture Overview",
  "textAlign": "left",
  "verticalAlign": "top",
  "containerId": null,
  "originalText": "Quarterly Architecture Overview",
  "autoResize": true,
  "lineHeight": 1.25
}
```

Preserve or establish:

- `text`
- `originalText`
- `fontSize`
- `fontFamily` — stored as a numeric family ID. `1` = Excalifont (default). Do NOT use a string font name.
- `textAlign` — `left`, `center`, or `right`
- `verticalAlign` — `top`, `middle`, or `bottom`
- `lineHeight` — unitless multiplier
- `containerId` when bound to a container
- `autoResize` where supported

Use explicit `\n` line breaks.

When text is bound to a container:

- the container's `boundElements` references the text: `[{"id": "text-id", "type": "text"}]`
- the text's `containerId` references the container
- both references use real element IDs
- the text bounds fit the container with padding

If using the skeleton API, prefer the documented `label: { text: "..." }` construction for text containers and labelled arrows, then convert it.

## Lines and arrows

Linear elements use:

- `type`: `line` or `arrow`
- a local `points` array of `[x, y]` tuples (relative to element origin)
- bounding `x`, `y`, `width`, and `height`
- `startArrowhead` and `endArrowhead` fields
- `startBinding` and `endBinding` when attached to elements
- a stable ID and ordinary style fields

### Arrow bindings

When an arrow is bound to elements, use this exact structure:

```json
{
  "startBinding": {
    "elementId": "source-element-id",
    "fixedPoint": [1, 0.5],
    "mode": "inside"
  },
  "endBinding": {
    "elementId": "target-element-id",
    "fixedPoint": [0, 0.5],
    "mode": "inside"
  }
}
```

- `elementId`: the ID of the bound element
- `fixedPoint`: normalized position on the target element `[x_ratio, y_ratio]` where `0` = left/top and `1` = right/bottom
- `mode`: one of `"inside"`, `"orbit"`, or `"skip"`

Common `fixedPoint` values:

- right edge: `[1, 0.5]`
- left edge: `[0, 0.5]`
- top edge: `[0.5, 0]`
- bottom edge: `[0.5, 1]`

When unbound, set `startBinding` and `endBinding` to `null`.

### Arrowheads

Supported values for `startArrowhead` and `endArrowhead`:

- `"arrow"`, `"bar"`, `"circle"`, `"triangle"`
- `"circle_outline"`, `"triangle_outline"`, `"diamond"`, `"diamond_outline"`
- cardinality markers: `"cardinality_one"`, `"cardinality_many"`, `"cardinality_one_or_many"`, `"cardinality_exactly_one"`, `"cardinality_zero_or_one"`, `"cardinality_zero_or_many"`
- `null` for no arrowhead

For a directed relationship:

- use `type: "arrow"`
- set `endArrowhead` to `"triangle"` (or another appropriate value)
- leave `startArrowhead` as `null` unless the relationship is intentionally bidirectional
- label the relationship when direction alone is insufficient

### Arrow example

```json
{
  "id": "edge-client-auth",
  "type": "arrow",
  "x": 400,
  "y": 220,
  "width": 260,
  "height": 120,
  "strokeColor": "#D6D1C7",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roundness": { "type": 2 },
  "roughness": 1,
  "opacity": 100,
  "angle": 0,
  "seed": 938441250,
  "version": 1,
  "versionNonce": 398440211,
  "index": "b1",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1750000000000,
  "link": null,
  "locked": false,
  "points": [[0, 0], [260, 120]],
  "startBinding": {
    "elementId": "node-client",
    "fixedPoint": [1, 0.5],
    "mode": "inside"
  },
  "endBinding": {
    "elementId": "node-auth",
    "fixedPoint": [0, 0.5],
    "mode": "inside"
  },
  "startArrowhead": null,
  "endArrowhead": "triangle",
  "elbowed": false
}
```

Bindings must refer to existing, non-deleted IDs.

When using the skeleton API, bind with `start` and `end` references and convert the skeleton. When authoring native JSON, follow the binding record shape shown above exactly.

Do not invent binding fields from memory when a current scene or API can supply them.

## Frames

Frames organize navigable boards and major regions.

```json
{
  "id": "frame-overview",
  "type": "frame",
  "x": 100,
  "y": 80,
  "width": 854,
  "height": 480,
  "strokeColor": "#D6D1C7",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roundness": { "type": 3 },
  "roughness": 1,
  "opacity": 100,
  "angle": 0,
  "seed": 218347651,
  "version": 1,
  "versionNonce": 551239001,
  "index": "a0",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1750000000000,
  "link": null,
  "locked": false,
  "name": "Overview"
}
```

When using the skeleton API, a frame uses:

- `type: "frame"`
- `children`: element ID list
- optional `name`

In native scene data, frame membership is represented through each child element's `frameId` field pointing to the frame's `id`. Preserve the current scene's convention and ensure membership is internally consistent.

A frame must contain the complete bounds of:

- child shapes
- child text
- connector labels
- annotations
- arrowheads and visible strokes
- optional maker mark

Do not use a frame as a decorative rectangle when a normal rectangle is more appropriate.

## Images and files

Only create image elements when the user asks or the source requires them.

Every image element must reference a valid entry in top-level `files`.

An image element additionally requires:

- `fileId` — references a key in the `files` object
- `status` — `"pending"`, `"saved"`, or `"error"`
- `scale` — `[xScale, yScale]` array, typically `[1, 1]`
- `crop` — `null` or a crop rectangle object

Do not fabricate base64 data, MIME types, hashes, or file IDs.

Preserve existing file records exactly unless intentionally replacing the image.

## IDs

Use semantic, stable IDs for authored scenes:

- `frame-overview`
- `node-auth-service`
- `text-auth-service`
- `edge-client-auth`
- `note-trust-boundary`
- `sig-overview`

Rules:

- IDs are unique across the entire scene
- repeated entities across frames receive distinct element IDs but stable semantic naming
- references are updated atomically
- editing preserves IDs unless replacement is required

## Ordering and layering

The `index` field controls visual stacking order.

General index assignment (earlier = lower in stack):

1. frames and broad background regions: `"a0"`, `"a1"`
2. large containers and boundaries: `"a2"`, `"a3"`
3. connectors that should pass behind nodes: `"b0"`, `"b1"`
4. nodes and shapes: continue incrementing
5. bound text and labels
6. annotations
7. titles
8. optional maker marks

Adjust deliberately when a connector or boundary must appear above another element.

Element array order should roughly match index order.

## Editing policy

When editing:

- parse before changing
- retain unknown keys
- retain application state unless the approved design changes it
- preserve stable IDs
- preserve files
- do not normalize all elements to a new schema
- change only fields required by the approved design
- write to a new file when destructive redesign risk is material, unless the user requests overwrite

## Scene preflight

Before geometry verification:

- strict JSON parses
- top-level contract exists
- every ID is unique
- every reference resolves
- no element uses nonfinite values
- no visible element has nonpositive dimensions
- deleted elements are not used as active targets
- frame membership is valid
- file references resolve
- text/container references are coherent
- arrow bindings are coherent
- every element has an `index` field
- every element has a nonzero `updated` timestamp
- `boundElements` uses `null` (not `[]`) when empty
- `boundElements` array entries use `{"id": "...", "type": "..."}` shape
- arrow `startBinding`/`endBinding` use the exact `elementId`/`fixedPoint`/`mode` shape
- arrow `startArrowhead`/`endArrowhead` use supported values or `null`
