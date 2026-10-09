# Handoff to `98-external-frontend-design`

## Purpose

This skill supplies Filigran brand/design-system constraints. `98-external-frontend-design` remains responsible for the subject-aware design process and artifact-specific execution.

## Handoff template

Build the equivalent of this brief in working context:

```text
SUBJECT
- What is being designed?
- Who is the audience?
- What is the single most important job/outcome?

DELIVERABLE
- Requested medium/format.
- Platform, dimensions, tooling, duration, print/digital constraints.
- If format is unspecified, choose based on the user's actual goal.

FILIGRAN MODE
- PRODUCT UI: Filigran UI is canonical; reuse @filigran/ui components/tokens/icons.
- CORPORATE/MARKETING: calibrate to live filigran.io; larger type, whitespace, branded gradient energy, proof/evidence.
- HYBRID: use product UI for interactive/product fragments and corporate styling for narrative framing.

SOURCE PRIORITY
1. User request.
2. Live/current Filigran UI or installed package.
3. Live filigran.io.
4. Verified skill snapshot.
5. Adaptation guidance.

VISUAL LANGUAGE
- Clean, modern, technical, credible cybersecurity.
- Blue/darkblue/turquoise as the brand's main chromatic axis.
- White/dark-navy contrast and selective blue→turquoise gradient emphasis.
- Semantic green/red/orange/yellow reserved for states/severity.
- Clear grids and consistent spacing.
- Product screenshots/diagrams as evidence.
- Official Filigran iconography/components where applicable.

TYPOGRAPHY
- Product: use documented semantic roles/classes when available.
- Corporate: translate to large clean hero typography, strong metric figures, readable body hierarchy.
- Do not invent an official font if not provided by current brand assets/source.

SIGNATURE
- Choose one memorable idea derived from the subject/content.
- Do not default to hacker/glitch visuals.

AVOID
- Black Ice/cyberpunk styling unless explicitly requested.
- Generic matrix/hacker tropes.
- arbitrary gradient spam.
- warning colors used decoratively.
- custom recreations of existing Filigran UI components.
- unsupported metrics/customer claims.
```

## Frontend-specific rule

If implementing code in an existing Filigran repository, inspect its actual dependency version and existing usage before adding new package APIs.

Do not assume the public docs exactly match the repository version.

## Final critique

Ask:

1. Does this feel like Filigran rather than generic enterprise SaaS?
2. Is the brand expression appropriate for product vs marketing context?
3. Were canonical components/tokens used where relevant?
4. Is gradient/color emphasis controlled and purposeful?
5. Are status colors semantic?
6. Is cybersecurity expertise communicated through content and information design rather than cliché visuals?
7. Is every metric, testimonial, logo, or customer claim sourced?
8. Is the output fully usable/accessibility-safe even without decorative brand effects?
