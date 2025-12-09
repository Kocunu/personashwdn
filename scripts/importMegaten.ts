import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const SOURCE_FILE = join(process.cwd(), 'demon_json.json')
const OUTPUT_DIR = join(process.cwd(), 'src', 'data', 'generated')
const OUTPUT_FILE = join(OUTPUT_DIR, 'personas.json')

type MaybeArray = string | string[] | null | undefined

interface SourcePersona {
  id: string | number
  name: string
  arcana: string
  level: string | number
  description: string
  image: string
  strength: string | number
  magic: string | number
  endurance: string | number
  agility: string | number
  luck: string | number
  weak?: MaybeArray
  resists?: MaybeArray
  reflects?: MaybeArray
  absorbs?: MaybeArray
  nullifies?: MaybeArray
  dlc?: string | number
  query?: string
}

interface PersonaRecord {
  id: number
  slug: string
  name: string
  arcana: string
  level: number
  description: string
  image: string
  stats: {
    strength: number
    magic: number
    endurance: number
    agility: number
    luck: number
  }
  affinities: {
    weak: string[]
    resists: string[]
    reflects: string[]
    absorbs: string[]
    nullifies: string[]
  }
  dlc: boolean
}

const parseNumber = (value: string | number | undefined): number => {
  if (value === undefined) return 0
  if (typeof value === 'number') return value
  const parsed = Number(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

const parseList = (value: MaybeArray): string[] => {
  if (!value) return []
  if (Array.isArray(value)) return value.map((entry) => entry.trim()).filter(Boolean)
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

const toSlug = (name: string, id: string | number) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .concat(`-${id}`)

function mapPersona(entry: SourcePersona): PersonaRecord {
  return {
    id: parseNumber(entry.id),
    slug: toSlug(entry.query ?? entry.name, entry.id),
    name: entry.name,
    arcana: entry.arcana,
    level: parseNumber(entry.level),
    description: entry.description,
    image: entry.image,
    stats: {
      strength: parseNumber(entry.strength),
      magic: parseNumber(entry.magic),
      endurance: parseNumber(entry.endurance),
      agility: parseNumber(entry.agility),
      luck: parseNumber(entry.luck),
    },
    affinities: {
      weak: parseList(entry.weak),
      resists: parseList(entry.resists),
      reflects: parseList(entry.reflects),
      absorbs: parseList(entry.absorbs),
      nullifies: parseList(entry.nullifies),
    },
    dlc: entry.dlc === 1 || entry.dlc === '1',
  }
}

async function ensureOutputDir() {
  await mkdir(OUTPUT_DIR, { recursive: true })
}

async function run() {
  await ensureOutputDir()
  const rawBuffer = await readFile(SOURCE_FILE)
  const raw = rawBuffer.toString('utf8').replace(/^\uFEFF/, '')
  const parsed: SourcePersona[] = JSON.parse(raw)
  const personas = parsed.map(mapPersona)
  await writeFile(OUTPUT_FILE, JSON.stringify(personas, null, 2))
  console.log(`Wrote ${personas.length} personas to ${OUTPUT_FILE}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
