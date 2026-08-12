# Basic SSRF

## Use When

Use this reference when an in-scope feature accepts a destination and the application visibly fetches, previews, imports, validates, or relays it.

## Safe Assessment

First establish the ordinary product behavior with a controlled endpoint that you own or the program provides. Send the smallest number of manually reviewed requests needed to determine whether the server, rather than the browser, performed the fetch. Compare the application response with the controlled endpoint's timestamp and correlation marker.

A confirmed result shows a server-originated request that the feature should not have made or that violates a documented destination restriction. A normal outbound integration to an explicitly configured destination is not SSRF by itself.

## Interpretation

Record whether the feature returns content, status information, transformed content, or only an acceptance message. Error text, timeout differences, and a client-side browser request do not independently establish SSRF. Do not use a finding to explore adjacent hosts or services.

## Source

- PortSwigger: [Server-side request forgery (SSRF)](https://portswigger.net/web-security/ssrf)
