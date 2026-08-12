# Key-Distribution Configuration

**Purpose:** Determine how a JWT consumer obtains, selects, pins, rotates, and validates verification keys.

**Preconditions:** Authorized access to public discovery metadata or approved configuration review; no external key hosting or callback testing without explicit authorization.

**Bounded assessment:** Identify configured JWKS locations, issuer-to-key bindings, allowed schemes/hosts, cache and rotation behavior, and whether `jwk`, `jku`, or `kid` headers can influence trust decisions. Review configuration or safe logs rather than attempting to introduce keys.

**Interpretation:** A finding requires a demonstrated untrusted path to key selection or retrieval that can affect signature verification. A publicly accessible JWKS endpoint is expected when correctly issuer-bound.

**False-positive controls:** Separate public discovery from dynamic trust; account for fixed allowlists, DNS controls, caches, and gateway-side validation.

**Evidence:** Discovery/configuration source, allowed issuer and key identifiers, trust restrictions, rotation behavior, and relevant validation logs.

**Remediation:** Pin issuer and JWKS origin; use HTTPS with strict host and redirect policy; cache with controlled refresh; bind keys to expected `kty`, use, algorithm, and issuer; ignore embedded or remote key references unless explicitly required.

**Sources:** [JWT header parameter injections](https://portswigger.net/web-security/jwt#jwt-header-parameter-injections), [JWK header injection](https://portswigger.net/web-security/jwt/jwk-header-injection), [JKU header injection](https://portswigger.net/web-security/jwt/jku-header-injection)
