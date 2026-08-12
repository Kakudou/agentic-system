# Cloud Metadata Safety

## Use When

Use this reference when deployment evidence identifies a cloud provider or a report must explain why metadata-service protections matter.

## Safety Boundary

Cloud metadata requests can expose instance identity and, in some configurations, sensitive access material. Do not request a metadata service through an application. A dedicated program-provided mock or fixture plus explicit written authorization is required even for identity-level validation. Never request credentials, tokens, user data, tags, network configuration, or service-account material.

## Assessment And Remediation

Document whether the application blocks link-local and provider metadata destinations, restricts outbound egress, and can attach required provider-specific headers or methods. Header or token requirements are protective distinctions, not testing instructions. Use the [cloud metadata reference](../assets/cloud-metadata-reference.md) for provider documentation and identity-only concepts.

## Sources

- PortSwigger: [Server-side request forgery (SSRF)](https://portswigger.net/web-security/ssrf)
- AWS: [Configure IMDS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html)
- Azure: [Azure Instance Metadata Service](https://learn.microsoft.com/azure/virtual-machines/instance-metadata-service)
- Google Cloud: [About VM metadata](https://cloud.google.com/compute/docs/metadata/overview)
