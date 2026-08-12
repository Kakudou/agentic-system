# Remediation Lookup

| Observed area | Desired property | Typical owner | Benign verification |
| --- | --- | --- | --- |
| Insecure entry or redirect inconsistency | Every applicable normal route reaches HTTPS predictably | Edge/platform and application | Navigate representative routes and confirm final destination |
| Browser policy inconsistency | Policy is enforced where the route's content requires it | Application and edge | Review normal response metadata and supported-browser console behavior |
| Incorrect media type or encoding declaration | Browser receives an accurate, intentional representation | Application response layer or CDN | Open normal content and compare declared and rendered type |
| Sensitive-response cache posture | Sensitive data is not stored beyond intended boundaries | Application and edge | Review normal authenticated and logout flows |
| Unintended framing or referrer behavior | Embedding and referral are limited to documented needs | Application and edge | Test documented normal navigation or embedding integration |
| Policy rollout breaks legitimate behavior | Security control preserves required integrations | Product owner, application, and platform | Stage on representative routes with rollback criteria |

Use the narrowest route-appropriate control. Confirm third-party, subdomain, CDN, and supported-browser dependencies before rollout.
