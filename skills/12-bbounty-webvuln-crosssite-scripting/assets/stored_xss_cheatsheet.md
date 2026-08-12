# Stored XSS Operational Checklist

All tests require authorization. Start with inert unique markers. Use only a non-destructive local execution signal after a durable entry-to-exit link and exact browser context are known.

## 1. Inventory every entry

| Entry class | Examples to enumerate | Why it is commonly missed | Record |
| --- | --- | --- | --- |
| User-authored content | Comments, reviews, chat, tickets, posts, wiki edits | Public pages are obvious; staff/reply views are not | Create/update endpoint, field, object ID, cleanup route |
| Profile and identity | Display name, bio, organization, avatar metadata | Rendered in mentions, audit logs, headers, and exports | Writer role, field constraints, all profile views |
| Operational metadata | Request headers, filenames, import columns, webhook fields | May be stored for support/monitoring rather than displayed immediately | Data origin, ingestion time, operator-facing views |
| API and integrations | JSON properties, external feed data, email/social content | Different validation pipeline from browser forms | Source system, transformation, update/delete semantics |
| Search/history/state | Saved searches, recent items, notification preferences | Values can be overwritten quickly or shown only after a transition | Retention, trigger condition, viewer population |

## 2. Use durable markers

Format each marker as `sx-<entry>-<counter>-<random>`, using letters and digits after the prefix, for example `sx-comment-03-Q7m2K9`. Keep a ledger:

| Marker | Entry and field | Submitted as | Expected exits | Observed exit/context | State | Cleanup |
| --- | --- | --- | --- | --- | --- | --- |
| `sx-comment-03-Q7m2K9` | comment body | POST form | post, moderation queue | post text node | persisted | delete comment |

Use one marker per field and object. Do not reuse a marker after editing, approving, or deleting it; otherwise an old cache or overwritten value can be mistaken for the current test.

## 3. Track state transitions

- Capture the submission request and immediate response, but do not call it stored yet.
- Refresh and revisit through a separate request after relogin or a cache-bypass navigation.
- Exercise moderation, approval, publication, indexing, notifications, pagination, search, sorting, export preview, and edit workflows.
- Record asynchronous delays and queue IDs; background processing can create later exits.
- Recheck after another user changes the same object because recency/history fields can be overwritten.
- Classify the result: immediate reflection, confirmed persistence, stored-to-DOM candidate, not found, sanitized, or rejected.

## 4. Cover viewer and role paths

| Viewer path | What to verify | Common pitfall |
| --- | --- | --- |
| Anonymous/public | Publication, cached copies, search snippets | Assuming public rendering matches authenticated templates |
| Content author | Self-view and edit/preview paths | Reporting self-XSS without independent delivery |
| Ordinary authenticated user | Feed, notification, mention, shared object views | Missing role-specific client rendering |
| Moderator/support | Queues, audit logs, escalation pages | Missing high-impact staff-only exit |
| Administrator | Global search, user management, exports | Testing beyond scope or failing to use a designated test role |

## 5. Select a context probe

At every confirmed exit, inspect raw response and final DOM. Select from `payload_catalog.md` by actual destination: inert element for HTML text, quote probe for an attribute, URL marker for navigational values, script/template probes for executable code, and DOM debugging for client-rendered content. A field can have multiple exits and contexts. Test each separately.

Before local execution confirmation, compare submitted bytes, stored representation if visible, response bytes, decoded DOM value, and client sink argument. This reveals sanitization and double-decoding. Never jump from “marker displayed” to an HTML payload without this evidence.

## 6. Safe proof, cleanup, and evidence

- Confirm only a local visible/console signal, under the target origin, using an authorized test viewer.
- Immediately remove the stored record or restore the original value; verify deletion from every exit and cache layer you can legitimately access.
- Preserve submission and cleanup requests, object identifiers, timestamps, writer/viewer roles, affected URLs, response/DOM context, CSP headers, browser signal, and screenshots.
- Redact tokens, user data, and internal identifiers in the final report.
- State if cleanup was blocked and notify the authorized contact through the agreed channel.

## False-positive guardrails

| Observation | Do not conclude | Required follow-up |
| --- | --- | --- |
| Value echoed after submission | Stored XSS | Retrieve it in a later independent request. |
| Marker in page source | Executable output | Inspect the live DOM and parser context. |
| Markup visible as text | XSS | Show that it becomes an executable DOM construct. |
| Execution in writer-only editor | Victim-compromising XSS | Demonstrate normal delivery to another permitted viewer. |
| Probe blocked by CSP | No vulnerability | Document unsafe injection separately and assess enforced policy. |
| Missing marker after later actions | Input was never stored | Check overwrite, moderation, indexing, and alternate exits. |

## Sources

- https://portswigger.net/web-security/cross-site-scripting/stored
- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
