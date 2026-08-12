# Cloud Metadata Identity-Level Reference

This lookup supports defensive interpretation only. It deliberately omits request URLs, credential paths, token procedures, and extraction guidance. Metadata services must not be contacted during an SSRF assessment without an explicitly authorized fixture.

| Provider | Identity-level concept | Protection distinction | Authoritative documentation |
|---|---|---|---|
| AWS EC2 | Instance identity | IMDSv2 uses session-oriented protection; IMDS can be disabled or constrained. | [AWS IMDS configuration](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) |
| Microsoft Azure | VM instance metadata | Requests require the provider's metadata header and are intended for local VM access. | [Azure IMDS](https://learn.microsoft.com/azure/virtual-machines/instance-metadata-service) |
| Google Compute Engine | VM instance metadata | Requests require the provider's metadata-flavor header. | [Google Cloud metadata overview](https://cloud.google.com/compute/docs/metadata/overview) |

Provider-specific headers and methods identify defensive expectations. They are not instructions to reproduce metadata requests through a target.
