# Delegation and Service Ownership Correlation

## Purpose and Preconditions

Use this guide when an in-scope DNS observation points to a delegated zone, alias target, mail service, or managed provider. It supports ownership clarification only. It does not authorize service claiming, account creation, endpoint testing, or takeover validation.

## Methodology

Map the observed DNS relationship: source name, record type, target name or provider indicator, authority boundary, and evidence source. Compare it with the asset inventory and program scope. Ask the asset owner or designated provider contact to confirm whether the relationship is intended when DNS alone cannot establish control.

## Interpretation and Attribution

A dangling-looking alias, parked target, NXDOMAIN response, or provider-branded hostname can result from normal migration, propagation, decommissioning, shared tenancy, or provider behavior. DNS does not prove account availability, claimability, impact, or responsible party. Report the relationship and its confidence, not a takeover conclusion.

## Limits, Evidence, and Handoff

Do not interact with provider control planes, create accounts, register resources, or contact unrelated third parties. Keep observations to allowed names and rates. Preserve the complete relationship, timestamps, authority context, and scope decision. Hand off suspected orphaned mappings to the asset owner for internal validation and remediation.

## Authoritative Sources

- [RFC 1034: Domain Names - Concepts and Facilities](https://datatracker.ietf.org/doc/html/rfc1034)
- [RFC 1035: Domain Names - Implementation and Specification](https://datatracker.ietf.org/doc/html/rfc1035)
- [CISA: Secure by Design](https://www.cisa.gov/securebydesign)
