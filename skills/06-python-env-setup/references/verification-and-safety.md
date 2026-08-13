# Verification and Safety

## Validate the Environment Interpreter

Run with the environment Python:

```python
import sys
print(sys.executable)
print(sys.version)
print(sys.prefix)
print(sys.base_prefix)
```

A running interpreter is inside a virtual environment when:

```python
sys.prefix != sys.base_prefix
```

The interpreter path should resolve beneath the expected `.venv`.

## Verify pip

Use:

```bash
<venv-python> -m pip --version
```

A normal `venv` bootstrap includes pip unless created with `--without-pip`.

If pip is unavailable, report it rather than switching to system pip.

## Existing Environment

Treat existing `.venv` as user/project state.

Do not delete it, run `venv --clear`, or overwrite it to fix a mismatch.

Report detected `pyvenv.cfg` information, current interpreter version, and project requirement mismatch.

Recreation requires an explicit separate decision.

## Relocatability

Virtual environments are disposable runtime artifacts, not portable project artifacts.

Do not commit or copy `.venv` as a substitute for dependency declarations.

## Dependencies

Creating `.venv` does not make the project ready by itself.

If the repository explicitly documents a dependency command, it may be reported as the next step. Do not infer that `pip install -r requirements.txt` is correct just because that filename is common.

## Failure States

Return `BLOCKED` when Python is unavailable, the required Python version is unavailable, `python -m venv` fails, existing `.venv` is malformed/incompatible, or the environment Python does not demonstrate isolation.

Include observed command/error. Never report a partial setup as ready.
