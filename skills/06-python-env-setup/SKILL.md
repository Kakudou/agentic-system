---
name: 06-python-env-setup
description: "Create or verify a project-local Python virtual environment with the standard-library venv module. Use when a Python repository needs an isolated .venv before tests, linting, typing, or development commands. Prefer python -m venv .venv, use the venv interpreter explicitly, verify isolation and pip, and never delete or clear an existing environment automatically."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Python Environment Setup

Create a boring project-local Python virtual environment.

Default target:

```text
.venv/
```

Default creation:

```bash
python -m venv .venv
```

Activation is optional. For automated work, use the environment interpreter directly.

## Usage

`/06-python-env-setup`

## Load Order

Always read:

- [Platform commands](references/platform-commands.md)
- [Verification and safety](references/verification-and-safety.md)

## Hard Rules

- Use the standard-library `venv` module.
- Default to `.venv` in the project root.
- Never use `--system-site-packages` unless explicitly requested.
- Never use `--clear`, delete, or recreate an existing `.venv` automatically.
- Never install or upgrade project dependencies merely because the environment was created.
- Never run `pip install --upgrade pip` automatically.
- Never modify `.gitignore` automatically.
- Never claim the environment is active; activation is shell-local state.
- Never require activation for subsequent commands.
- Never use system `pip` after creating the environment.
- Do not commit `.venv`.

## Workflow

### 1. Resolve Project Root

Operate from the current Python project/repository root supplied by the workflow context.

Do not crawl unrelated parent trees looking for a different project.

### 2. Resolve Base Python

Prefer an interpreter explicitly required by the project or user.

Otherwise use the available project-appropriate `python` command.

Inspect:

```bash
python --version
python -c "import sys; print(sys.executable)"
```

If the project declares a required Python version, verify compatibility before creating the environment.

Do not silently select a different major/minor interpreter.

### 3. Inspect `.venv`

If `.venv` does not exist:

```bash
python -m venv .venv
```

If `.venv` already exists:

- do not recreate it;
- inspect `pyvenv.cfg`;
- verify the environment interpreter runs;
- verify it belongs to this `.venv`.

If it is broken or based on the wrong Python version, return the mismatch and recommend explicit recreation. Do not destroy it automatically.

### 4. Use the Environment Interpreter Directly

POSIX:

```bash
.venv/bin/python
```

Windows:

```text
.venv\Scripts\python.exe
```

Use that interpreter for Python and pip commands.

Example:

```bash
.venv/bin/python -m pip --version
```

Do not depend on shell activation.

### 5. Verify Isolation

Run the environment interpreter and verify:

```python
import sys
assert sys.prefix != sys.base_prefix
```

Report:

- environment interpreter path;
- Python version;
- `sys.prefix`;
- `sys.base_prefix`;
- pip availability.

### 6. Stop

Environment creation is complete once the isolated interpreter is valid.

Dependency installation is a separate action driven by the repository's declared dependency workflow or explicit user instruction.

Do not guess an install command.

## Output

Return:

- project root;
- base Python executable/version;
- `.venv` status: `CREATED | REUSED | BLOCKED`;
- environment Python executable/version;
- isolation verification;
- pip verification;
- warnings/mismatches;
- next project-native setup command only when explicitly declared by the repository.

Do not claim dependencies are installed unless they actually are.
