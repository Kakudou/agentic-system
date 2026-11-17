import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const canonicalPath = fileURLToPath(new URL('../../../claude_plugins/otsumi/core/rpg-dice.js', import.meta.url))
const generatedPath = fileURLToPath(new URL('../generated/rpg-dice.js', import.meta.url))

async function main() {
  const args = process.argv.slice(2)
  if (args.length !== 1 || !['--write', '--check'].includes(args[0])) {
    console.error('usage: node scripts/sync-rpg-dice-core.mjs (--write|--check)')
    process.exitCode = 2
    return
  }

  const canonicalBytes = await readFile(canonicalPath)

  if (args[0] === '--write') {
    await mkdir(dirname(generatedPath), { recursive: true })
    await writeFile(generatedPath, canonicalBytes)
    console.log('wrote generated/rpg-dice.js from canonical core')
    return
  }

  let generatedBytes
  try {
    generatedBytes = await readFile(generatedPath)
  } catch (error) {
    if (error?.code === 'ENOENT') {
      console.error('generated/rpg-dice.js is missing; run npm run generate:core')
      process.exitCode = 1
      return
    }
    throw error
  }

  if (!canonicalBytes.equals(generatedBytes)) {
    console.error('generated/rpg-dice.js differs from the canonical core; run npm run generate:core')
    process.exitCode = 1
    return
  }

  console.log('generated/rpg-dice.js matches the canonical core')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
