# Commit Messages and Gitmoji

Use one emoji whose meaning best matches the commit's dominant intent.

Preferred form:

```text
{emoji} {type}({scope}): {message}
```

Without a meaningful scope:

```text
{emoji} {type}: {message}
```

Fallback when no gitmoji fits:

```text
{type}({scope}): {message}
```

## Common Mappings

| Emoji | Conventional type | Use when |
|---|---|---|
| ✨ | `feat` | Introduce a feature |
| 🐛 | `fix` | Fix a bug |
| 🚑️ | `fix` | Critical hotfix |
| 🩹 | `fix` | Small non-critical fix |
| ♻️ | `refactor` | Refactor without changing intended behavior |
| 🎨 | `style` / `refactor` | Improve code structure or formatting |
| 🔥 | `chore` | Remove code or files |
| ⚰️ | `chore` | Remove dead code |
| ⚡️ | `perf` | Improve performance |
| 🏷️ | `refactor` / `chore` | Add or update types |
| 🦺 | `fix` / `feat` | Add or update validation |
| 🧵 | `feat` / `refactor` | Concurrency or multithreading |
| ✅ | `test` | Add/update passing tests |
| 🧪 | `test` | Add a failing test |
| 📸 | `test` | Add/update snapshots |
| 🤡 | `test` | Add/update mocks |
| 📝 | `docs` | Add/update documentation |
| 💡 | `docs` | Add/update source comments |
| 💬 | `chore` | Add/update text or literals |
| 📄 | `docs` / `chore` | License changes |
| 💄 | `style` / `feat` | UI/style files |
| 🚸 | `feat` / `fix` | UX/usability |
| ♿️ | `fix` / `feat` | Accessibility |
| 📱 | `feat` | Responsive design |
| 💫 | `feat` | Animation/transition |
| 🍱 | `chore` | Assets |
| ➕ | `build` / `chore` | Add dependency |
| ➖ | `build` / `chore` | Remove dependency |
| ⬆️ | `build` / `chore` | Upgrade dependency |
| ⬇️ | `build` / `chore` | Downgrade dependency |
| 📌 | `build` / `chore` | Pin dependency |
| 🔧 | `chore` | Configuration |
| 🔨 | `chore` | Development scripts |
| 👷 | `ci` | CI/build system |
| 💚 | `ci` | Fix CI |
| 🚨 | `fix` / `chore` | Compiler/linter warnings |
| 📦️ | `build` | Compiled files/packages |
| 🙈 | `chore` | `.gitignore` |
| 🔒️ | `fix` | Security/privacy fix |
| 🛂 | `feat` / `fix` | Auth/roles/permissions |
| 🏗️ | `refactor` / `feat` | Architectural change |
| 🧱 | `chore` / `feat` | Infrastructure |
| 🩺 | `feat` | Healthcheck |
| 🚚 | `refactor` / `chore` | Move/rename resource |
| 👽️ | `fix` | External API compatibility |
| 🦖 | `fix` / `feat` | Backwards compatibility |
| 📈 | `feat` / `chore` | Analytics/tracking |
| 🗃️ | `feat` / `chore` | Database change |
| 🌱 | `chore` | Seed data |
| 🧐 | `chore` | Data exploration/inspection |
| 🔊 | `chore` | Add/update logs |
| 🔇 | `chore` | Remove logs |
| 🌐 | `feat` / `chore` | Localization |
| 🔍️ | `feat` / `chore` | SEO |
| ✈️ | `feat` | Offline support |
| ✏️ | `fix` | Typo |
| 👥 | `chore` | Contributors |
| 👔 | `feat` / `fix` | Business logic |
| 🚩 | `feat` / `chore` | Feature flags |
| ⚗️ | `chore` | Experiment |
| 🧑‍💻 | `chore` | Developer experience |

## Message Rules

- Use imperative, concise wording.
- Describe what the commit changes, not the work session.
- Avoid trailing period.
- Do not use two emojis to describe two intents. Split the commit instead.
- Infer scope from the affected subsystem when obvious; omit it rather than inventing one.

Examples:

```text
✨ feat(auth): add token encryption
🐛 fix(config): read default port from env
✅ test(core): add checksum regression test
♻️ refactor(core): extract date validation
⚰️ chore(connector): remove dead code
```

## Save Commit

Only when the user explicitly requests a temporary checkpoint:

```text
save(scope): message
```

A save commit is intentionally temporary history and should not be disguised as a finished atomic
commit.

## Fixup Commit

Only when the user explicitly requests a fixup:

```bash
git commit --fixup=<target>
```

Do not autosquash automatically. Preserve the fixup visibly unless the user separately asks to
rewrite history.
