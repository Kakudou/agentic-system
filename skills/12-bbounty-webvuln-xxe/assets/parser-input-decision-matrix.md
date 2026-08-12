# Parser and Input-Format Decision Matrix

## Purpose and Preconditions

Use before testing to select one authorized parser boundary. Start with a captured valid baseline and confirmed request contract. If the owner cannot identify the processing path, restrict work to passive observation and request architecture evidence.

## Matrix

| Input context | Parser clues | Content-type or transport distinction | Safe marker method | Evidence and stop point |
|---|---|---|---|---|
| XML API | XML body, schema errors, XML library logs | Test only accepted XML media types. | One internal harmless marker in a valid baseline. | Record paired responses; stop after any instability. |
| SOAP | Envelope, SOAP fault, WSDL | SOAP version and action headers select middleware. | Preserve envelope and operation; change only marker location. | Capture fault/trace ID; do not change operation semantics. |
| SVG upload | Image conversion, thumbnail job, SVG validation | Multipart metadata and file handling may select another parser. | Use a valid benign SVG with a marker-only structural change. | Record file metadata and conversion logs; stop on corruption/delay. |
| Feed/import | Scheduled ingestion, XML feed validation | May parse asynchronously or after storage. | Owner-assisted marker test in a staging import. | Correlate job ID; no callbacks or external references. |
| Document conversion | Office/XML archive, preview service | MIME sniffing and converter may ignore request header. | Prefer owner-supplied harmless fixture and test environment. | Capture converter version/logs; stop on queue backlog. |
| XML embedded in JSON/form | Field contains markup-like text | Outer API may treat it as text, then a downstream service parses it. | Keep outer encoding valid and alter only one marker field. | Prove downstream parse via owner logs before conclusions. |

## Observations and Interpretation

An XML-looking body is not proof of XML parsing. Schema rejection may precede parser feature handling. A successful upload may mean only storage. Treat parser-specific logs or deterministic marker handling as stronger evidence than an HTTP status.

## False-Positive Controls, Authorization Limits, and Evidence

Use the same account, business data, request size, and rate for baseline and marker. Exclude WAF, gateway, cache, scanner, queue, and authentication effects. Do not change content type unless that exact variant is documented and authorized. Never use resource identifiers, paths, callbacks, or expansion tests. Capture the baseline/probe pair, declared format, route, trace ID, parser evidence, and any stop condition.

## Remediation

Inventory every confirmed parser boundary and apply the controls in [secure parser configuration lookup](secure-parser-remediation-lookup.md). Regression-test each boundary, including background workers.

## Source

PortSwigger: <https://portswigger.net/web-security/xxe>
