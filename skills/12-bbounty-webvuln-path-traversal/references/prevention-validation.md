# Prevention And Validation

## Purpose And Preconditions

Use after an authorized marker-only assessment or during secure design review. Require the affected feature's intended base location, supported filename/identifier grammar, and a safe regression fixture.

## Bounded Marker Workflow

1. Define an allowed marker identifier and its exact expected resolved location.
2. Verify ordinary selection succeeds.
3. Verify ambiguous, rooted, malformed, and out-of-policy marker representations are rejected without disclosing paths or content.
4. Verify the resolved marker stays contained after canonical resolution; test link or archive behavior only with approved fixtures.
5. Record results and remove tester-created markers when permitted.

## Normalization And Decoding Model

Prefer opaque identifiers mapped server-side to approved resources. If filenames are necessary, decode once at a defined boundary, validate against a strict allowlist, resolve against a fixed trusted base with platform-native APIs, canonicalize, and enforce containment using path-aware comparisons. String replacement and raw prefix checks are insufficient. Apply equivalent checks to upload names, archive entries, links, and object-storage keys.

## Observations And Interpretation

Passing validation means expected marker behavior is consistent through the final resolver, not merely that a perimeter filter returned an error. A response that leaks resolved paths, handler internals, or other content should be treated as a separate disclosure concern.

## False-Positive Controls

Run tests in the deployed request path, not only a unit helper. Test authorization separately from path validation. Confirm that caches, proxies, and framework routers do not apply a different decode or normalization order.

## Evidence And Remediation

Retain the regression fixture description, accepted/rejected marker cases, final containment assertion, and deployment context. Prioritize opaque identifiers, then strict validation and canonical containment; add regression coverage for each historical processing boundary.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
