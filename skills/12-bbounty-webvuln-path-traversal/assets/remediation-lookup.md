# Path-Handling Remediation Lookup

| Observed weakness | Preferred remediation | Validation evidence |
|---|---|---|
| User input directly selects a file | Map opaque allowlisted identifiers to server-side resources | Unknown identifiers are rejected; approved marker maps only to its expected resource |
| Filename input is required | Decode once, enforce strict filename grammar and extension policy | Ambiguous or malformed marker representations are consistently rejected |
| Trusted base is joined with input | Resolve with a platform-native API and verify canonical containment after resolution | Final resolved marker path remains under the fixed base |
| Validation precedes later decoding | Define one decoding boundary before validation and resolution | Deployed request path has consistent marker behavior across permitted representations |
| Links can escape the base | Reject links or resolve safely and enforce containment on the resolved object | Approved link fixture cannot cross the fixed base |
| Archive extraction accepts names | Validate every entry name and final extraction destination before writing | Program-provided archive fixture remains contained |
| Object keys act as paths | Treat keys as identifiers and apply namespace allowlists | Marker cannot address another approved namespace |
| Error response reveals internals | Return generic client errors; retain detailed diagnostics only in protected logs | Rejected marker cases disclose neither resolved paths nor content |

## Design Rules

1. Prefer server-side identifiers over client-controlled paths.
2. Perform controlled parsing once, then validate and resolve with the same platform semantics used for access.
3. Enforce containment using resolved path objects, never string replacement or simple prefix checks.
4. Keep authorization separate from path validation, and apply both before file access.
5. Add marker-based regression tests for every previously observed processing boundary.

Source: [PortSwigger path traversal](https://portswigger.net/web-security/file-path-traversal).
