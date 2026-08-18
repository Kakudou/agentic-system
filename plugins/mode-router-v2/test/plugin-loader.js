import { access, readFile } from "node:fs/promises"

const activeEntrypoint = new URL("../index.js", import.meta.url)
const disabledEntrypoint = new URL("../index.js.disabled", import.meta.url)

async function exists(url) {
  try {
    await access(url)
    return true
  } catch {
    return false
  }
}

export async function loadModeRouterPlugin() {
  if (await exists(activeEntrypoint)) {
    return (await import(activeEntrypoint.href)).default
  }

  // The live plugin is intentionally disabled during RED/GREEN work. Load that
  // exact source as a data module while resolving its local imports against the
  // disabled file's real location. This keeps index.js absent until the suite is
  // green without testing a copied implementation.
  const source = (await readFile(disabledEntrypoint, "utf8"))
    .replaceAll("import.meta.url", JSON.stringify(disabledEntrypoint.href))
    .replace(
      /from\s+(["'])(\.\/[^"']+)\1/g,
      (_match, _quote, specifier) =>
        `from ${JSON.stringify(new URL(specifier, disabledEntrypoint).href)}`,
    )

  const encoded = Buffer.from(source).toString("base64")
  return (await import(`data:text/javascript;base64,${encoded}`)).default
}
