# OIDC Discovery And Provider Configuration

## Purpose And Preconditions

Review published or documented OAuth/OIDC metadata and the relying party's configured trust relationship. Metadata enumeration is read-only, but an advertised endpoint does not grant permission to use registration, token, introspection, revocation, or management functions.

## Safe Bounded Method

1. Obtain the provider metadata from an approved public source, discovery document, or configuration owner.
2. Record the issuer, authorization/token/userinfo endpoints, JWKS location, supported response and grant types, signing algorithms, and registration policy.
3. Compare those values with the client's configured issuer, redirect registrations, client type, authentication method, and expected audiences.
4. Check whether the client pins a trusted issuer and retrieves keys only from the configured provider. Review key rotation behavior through documentation or sanctioned test telemetry.
5. Treat dynamic registration and request-object features as review items unless the program explicitly authorizes a dedicated test client.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| Configured issuer and discovery issuer match exactly | Expected trust anchor. |
| Broad legacy response types are advertised but unused | Configuration hardening opportunity; not necessarily exploitable. |
| Key source or accepted algorithm is not constrained to trusted metadata | Requires validation of the consumer's actual verification behavior. |
| Registration endpoint is advertised | It may be intentionally protected; do not invoke it without explicit scope. |

## False-Positive Controls

- Provider metadata can differ between tenant, authorization-server, staging, and production paths.
- Advertising a capability does not mean the client enables it.
- Key rotation may legitimately expose multiple keys or a retired key during overlap.

## Evidence

Preserve metadata URL or configuration source, retrieval time, relevant field names and redacted values, client configuration comparison, and authorization limits.

## Remediation

Pin the expected issuer, restrict clients to needed response/grant types and algorithms, use trusted JWKS retrieval with rotation handling, register exact callbacks per client, protect client credentials, and disable unused registration or advanced features.

## PortSwigger Sources

- [OpenID Connect](https://portswigger.net/web-security/oauth/openid-connect)
- [OAuth 2.0 authentication vulnerabilities](https://portswigger.net/web-security/oauth)
