# Ownership Attribution And False-Positive Controls

## Purpose And Preconditions

Use when a delegation appears to lead outside the asset owner's DNS zone or toward shared provider infrastructure. Require an admitted in-scope source name and at least one independent ownership source. This is passive correlation only; it does not authorize contact with a provider, customer, or tenant.

## Methodology

Separate four claims in the worksheet: control of the source DNS name, operation of the delegated service, control of any provider account, and ownership of affected content. Corroborate only with program scope, owner-provided inventory, public organizational documentation, and provenance-preserving passive records. Label each claim confirmed, likely, unverified, or third-party.

## Interpretation And Controls

A provider hostname, certificate name, error page, or historical passive record does not prove that the program owns the service or that an account is unassigned. Multi-tenant and reseller environments are especially prone to false attribution. Treat evidence of another organization, customer, or provider-managed boundary as third-party and stop rather than investigate it.

## Evidence And Handoff

Record each attribution source, collection date, conflicts, and the distinction between DNS ownership and service ownership. Send unresolved attribution questions to the named asset owner; omit third-party details beyond what is needed to explain the stop decision.

## Authoritative Sources

- [RFC 2181, Clarifications to the DNS Specification](https://datatracker.ietf.org/doc/html/rfc2181)
- [CISA, Stakeholder-Specific Vulnerability Categorization](https://www.cisa.gov/resources-tools/resources/stakeholder-specific-vulnerability-categorization-ssvc)
- [Microsoft Azure architecture: multitenancy and service isolation](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/isolation)
