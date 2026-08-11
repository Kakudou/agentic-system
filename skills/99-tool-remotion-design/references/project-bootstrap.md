# Project Bootstrap

Bootstrap after approval. It must be **idempotent**: repeated execution must not create duplicate projects/dependencies, switch package manager, reset configuration, or overwrite unrelated work.

## Current official anchors
Always prefer current Remotion docs over memory. Current docs at authoring time show new scaffolding through `npx create-video@latest`, an automated blank example `npx create-video@latest --yes --blank <directory>`, Agent Skills through `npx skills add remotion-dev/skills`, and project workflows may expose `npx remotion skills add`.

## Environment states
### EXISTING_REMOTION_PROJECT
Inspect versions/scripts/compositions; preserve package manager/framework/IDs; install only missing packages; do not scaffold.

### EXISTING_REACT_PROJECT_WITHOUT_REMOTION
Integrate locally using current official installation guidance; preserve framework/routing; add only required Remotion packages; isolate composition/render entrypoints; add Player only if architecture needs it.

### NO_SUITABLE_PROJECT
Choose a dedicated nonconflicting directory; scaffold with current official tooling; minimum suitable template; preserve chosen package manager; install dependencies; add official Agent Skills; probe.

## Package-manager preservation
Infer from lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`/`bun.lockb`) or documented project convention. Never switch for convenience.

## Never as repair shortcut
Do not delete lockfiles/manifests, broadly upgrade dependencies, globally install Remotion/React/build tools, recreate over the project, replace framework, disable TypeScript/lint globally, weaken security, or expose `.env`.

## Skills
Check discoverability of `remotion-best-practices`. If absent, install using current official installer; verify discovery rather than trusting install output. Never vendor into this skill.

## Compatibility
When uncertain, check current official runtime/OS/native/browser/package/media requirements. Do not guess blockers from memory.

## Capability probe
### Rendered composition
1. dependency resolution
2. configured checks/build
3. composition discovery
4. Studio starts when supported
5. representative still renders
6. short video range renders
7. artifacts exist/open and are inspected when supported

### Still-only
Discovery → still render → file inspection.

### Player/web
App starts/builds → Player mounts → composition loads → playback advances → props update → responsive container works → render-safe logic remains independent from web-only state.

### Multi-format
Probe every fundamentally different pipeline.

## Failure
Classify dependency/runtime/bundling/composition/asset/browser/codec/render/Player/framework/permissions. Fix the smallest verified cause and rerun the failed probe before production.

## Output
Keep generated media separate from source assets; never overwrite source media.

## Licensing awareness
For automated rendering, SaaS, Player products, organizational systems, or high-volume usage, remind the user to verify current Remotion licensing. Do not give legal conclusions.

## Studio observer handoff

The capability probe may start Studio before full implementation.

After the probe passes and `remotion-best-practices` is loaded:

- retain the same Studio process when practical
- otherwise restart it through the current official project command
- report the reachable local URL when the environment exposes localhost
- classify the observer state as `STUDIO_VISIBLE`, `STUDIO_RUNNING_NOT_EXPOSED`, or `STUDIO_UNAVAILABLE`
- do not block autonomous implementation waiting for the user to open Studio
- do not interpret successful Studio startup as visual inspection

