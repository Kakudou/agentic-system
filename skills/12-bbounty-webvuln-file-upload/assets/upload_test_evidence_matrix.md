# Upload Test and Evidence Matrix

Plan the smallest set of authorized comparisons necessary to answer the assessment question.

| Assessment area | Inert comparison | Confirmed observation required | Common false positive |
|---|---|---|---|
| Acceptance policy | Approved baseline versus approved unsupported sample | Server decision and absence of a retrievable object after rejection | Client-side message differs while server policy is correct |
| Metadata handling | One approved presented-name or declared-type difference | Returned normalized metadata and retrieval headers | Gateway rewrites metadata before the application sees it |
| Processing | Known-good sample versus authorized benign damaged copy | Processing state and safe final outcome | Async delay or cache behavior |
| Storage isolation | Designated account's accepted object through intended retrieval | Object ownership and authorized retrieval result | Signed URL is intentionally shareable or expired |
| Serving behavior | Accepted object through intended download or preview | Content type, disposition, and authorization response | Header alone is treated as proof of execution |
| Cleanup | Test object after completion | Deletion, expiry, or documented handoff | Background retention or delayed deletion |

For every row, preserve the scope reference, sample ID, timestamp, redacted request/response, false-positive checks, and cleanup status.
