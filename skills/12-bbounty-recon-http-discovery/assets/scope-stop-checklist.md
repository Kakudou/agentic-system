# Scope and Stop Checklist

- [ ] Written authorization identifies the exact endpoint and time window.
- [ ] Scheme, port, path boundary, rate limit, and allowed request type are known.
- [ ] No host, port, path, parameter, method, header, or TLS variation is implied by the task.
- [ ] Redirect destinations are followed only when explicitly in scope.
- [ ] No credentials, sensitive content, destructive action, or state change is involved.
- [ ] Stop on scope ambiguity, unexpected authentication, instability, errors suggesting impact, or program-rule conflict.
- [ ] Record the stop reason and hand off rather than expanding activity.
