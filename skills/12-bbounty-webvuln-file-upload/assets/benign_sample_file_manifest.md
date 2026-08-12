# Benign Sample-File Manifest and Expected Behavior Checklist

Use only samples supplied or approved by the engagement. Keep files small, non-sensitive, inert, and identifiable by a local test ID. Do not include scripts, macros, embedded active content, polyglots, configuration files, or production data.

| Sample ID | Class | Properties | Expected behavior to record |
|---|---|---|---|
| IMG-BASE | Raster image | Known-good small image, ordinary metadata | Accepted or rejected per policy; processed derivative and delivery headers |
| DOC-BASE | Document | Benign small document, no active elements | Accepted or rejected per policy; preview/download and authorization behavior |
| DATA-BASE | Structured data | Minimal synthetic rows or fields | Validation result; import is not run against live data without authorization |
| TYPE-NEG | Unsupported benign file | Program-approved unsupported format | Clear rejection or quarantine; no retrievable object |
| INTEGRITY-NEG | Benign damaged copy | Approved truncated or invalid copy of a baseline | Safe rejection or quarantine; no processing instability |

## Checklist

- [ ] Sample ID, format, size, and approval are recorded.
- [ ] The baseline's expected accepted or rejected result is known.
- [ ] Only one approved attribute changes per comparison.
- [ ] The sample contains no credentials, personal data, active content, or sensitive metadata.
- [ ] A deletion, expiry, or owner handoff is available before upload.
