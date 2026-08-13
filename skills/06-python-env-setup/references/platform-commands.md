# Platform Commands

## Create

Preferred:

```bash
python -m venv .venv
```

When the project explicitly requires a particular interpreter, invoke that verified interpreter instead, for example:

```bash
python3.13 -m venv .venv
```

Do not guess a version-specific command that has not been verified to exist.

## POSIX

Environment Python:

```bash
.venv/bin/python
```

Environment pip:

```bash
.venv/bin/python -m pip
```

Optional interactive activation:

```bash
source .venv/bin/activate
```

Activation only adjusts the current shell PATH and is not required.

## Windows

Environment Python:

```text
.venv\Scripts\python.exe
```

Environment pip:

```text
.venv\Scripts\python.exe -m pip
```

Optional cmd activation:

```text
.venv\Scripts\activate.bat
```

Optional PowerShell activation:

```powershell
.venv\Scripts\Activate.ps1
```

Do not change PowerShell execution policy automatically.

## Why `<venv-python> -m pip`

This binds pip to the exact interpreter instead of relying on whichever `pip` executable appears first on PATH.

## No Automatic Upgrades

Do not add `--upgrade-deps` by default and do not immediately upgrade pip from the network.

Environment bootstrap and dependency/toolchain upgrades are separate operations.
