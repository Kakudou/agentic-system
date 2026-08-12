# File-Type, Processing, and Serving Decision Matrix

Use this matrix to select low-risk, authorized inert samples and define the observation to collect. It does not authorize deviations from the engagement's permitted formats.

| File class | Safe baseline | Processing observation | Serving observation | Stop or escalate when |
|---|---|---|---|---|
| Raster image | Small known-good PNG or JPEG | Resize, conversion, metadata stripping, queued state | Returned type, disposition, authorized retrieval | Processing errors persist, queue load rises, or unexpected public access appears |
| Document | Small benign PDF or plain-text document if permitted | Virus scan or preview status, metadata extraction | Download authorization and attachment behavior | Preview renders active content, personal data appears, or retention is unclear |
| Structured data | Tiny benign CSV or JSON only if business-required | Schema or import validation, field limits | Download/export authorization | Import changes live data or triggers integration activity |
| Media | Short inert audio or video only if permitted | Transcoding state, duration and size limits | Stream authorization and range handling | Transcoding pressure, unexpected sharing, or persistent jobs occur |
| Unsupported type | Program-approved inert non-accepted file | Clear server-side rejection or quarantine | No retrievable object | It is accepted, published, or enters a processing queue unexpectedly |

Expected controls: allowlisted formats, server-side parsing, bounded processing, opaque server names, non-executable storage, authorization at retrieval, and conservative response headers.
