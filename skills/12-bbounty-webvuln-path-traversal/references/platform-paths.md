# Platform Paths

## Purpose And Preconditions

Use when the deployment platform, runtime, container boundary, archive format, or storage provider may affect path semantics. Require authorized scope, a harmless marker, and a baseline that reaches the relevant path sink.

## Bounded Marker Workflow

1. Establish the marker's documented logical location and normal response.
2. Compare only platform-relevant, semantically equivalent marker representations one at a time.
3. Record separator, case, volume/root, link, and archive-entry behavior only as observed from marker handling.
4. Stop if the application returns content beyond the marker or reveals a potentially sensitive path.

## Normalization And Decoding Model

Platforms differ in separator handling, case sensitivity, rooted paths, reserved names, link resolution, and archive extraction behavior. Containers and object stores can add another namespace. The application must not rely on string prefixes: resolve using the host's safe path API, canonicalize as appropriate, reject rooted or ambiguous input, and verify the resolved object remains under the authorized base.

## Observations And Interpretation

- Error formatting is weak platform evidence and must not drive further testing.
- A marker result that crosses the documented selection boundary is meaningful only when repeatable under the same authorization context.
- Link or archive behavior is relevant when the feature explicitly supports those objects; do not create them merely to test.

## False-Positive Controls

Separate application behavior from reverse-proxy rewriting and storage-service key semantics. Confirm marker ownership and that the same endpoint implementation handled each comparison.

## Evidence And Remediation

Capture the deployment clues supplied by the program, marker comparison results, and any relevant feature contract. Use platform-native safe resolution, prohibit unexpected rooted paths and links, and apply equivalent containment checks to archive entries and storage keys.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
