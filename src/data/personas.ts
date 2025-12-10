import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Element, ElementAffinityMap, Persona, Arcana, Affinity } from '@/domain';

type GeneratedAffinityBuckets = {
	weak: string[];
	resists: string[];
	reflects: string[];
	absorbs: string[];
	nullifies: string[];
};

type GeneratedPersona = {
	id: number;
	slug: string;
	name: string;
	arcana: string;
	level: number;
	description: string;
	image: string;
	stats: {
		strength: number;
		magic: number;
		endurance: number;
		agility: number;
		luck: number;
	};
	affinities: GeneratedAffinityBuckets;
	dlc: boolean;
};

const resolveArcana = (arcana: string): Arcana | undefined => {
	const key = arcana.toLowerCase().replace(/\s+/g, '_') as keyof typeof Arcana;
	return Arcana[key];
};

const elementMap: Record<string, Element> = {
	fire: Element.Fire,
	ice: Element.Ice,
	electric: Element.Electric,
	elec: Element.Electric,
	wind: Element.Wind,
	psy: Element.Psy,
	nuclear: Element.Nuclear,
	nuke: Element.Nuclear,
	bless: Element.Bless,
	light: Element.Bless,
	curse: Element.Curse,
	dark: Element.Curse,
	gun: Element.Gun,
	slash: Element.Physical,
	strike: Element.Physical,
	pierce: Element.Physical,
	physical: Element.Physical,
	almighty: Element.Almighty,
};

const mapAffinities = (aff: GeneratedAffinityBuckets): ElementAffinityMap => {
	const result: ElementAffinityMap = {};
	const apply = (elems: string[], affinity: Affinity) => {
		for (const raw of elems) {
			const mapped = elementMap[raw.trim().toLowerCase()];
			if (mapped) result[mapped] = affinity;
		}
	};
	apply(aff.nullifies, Affinity.Null);
	apply(aff.absorbs, Affinity.Drain);
	apply(aff.reflects, Affinity.Repel);
	apply(aff.resists, Affinity.Resist);
	apply(aff.weak, Affinity.Weak);
	return result;
};

const computeHp = (level: number, strength: number, endurance: number) =>
	Math.max(1, Math.round(level * 4 + strength * 6 + endurance * 5));
const computeSp = (level: number, magic: number, agility: number) =>
	Math.max(1, Math.round(level * 3 + magic * 7 + agility * 3));

const loadGeneratedPersonas = (): Persona[] => {
	const dataPath = fileURLToPath(new URL('../data/generated/personas.json', import.meta.url));
	const raw = readFileSync(dataPath, 'utf8');
	const parsed = JSON.parse(raw) as GeneratedPersona[];

	return parsed
		.map((p) => {
			const arcana = resolveArcana(p.arcana);
			if (!arcana) return null;
			const stats = {
				level: p.level,
				hp: computeHp(p.level, p.stats.strength, p.stats.endurance),
				sp: computeSp(p.level, p.stats.magic, p.stats.agility),
				strength: p.stats.strength,
				magic: p.stats.magic,
				endurance: p.stats.endurance,
				agility: p.stats.agility,
				luck: p.stats.luck,
			};

			return {
				id: String(p.slug),
				name: p.name,
				arcana,
				description: p.description,
				stats,
				affinities: mapAffinities(p.affinities),
				skills: [],
				sourceGame: p.dlc ? 'DLC' : undefined,
				race: undefined,
			} satisfies Persona;
		})
		.filter(Boolean) as Persona[];
};

export const personas: Persona[] = loadGeneratedPersonas();

export interface PersonaFilter {
	search?: string;
	arcana?: Arcana;
	minLevel?: number;
	maxLevel?: number;
}

export const listPersonas = (filters: PersonaFilter = {}) => {
	const { search, arcana, minLevel, maxLevel } = filters;

	return personas.filter((persona) => {
		if (arcana && persona.arcana !== arcana) return false;
		if (minLevel && persona.stats.level < minLevel) return false;
		if (maxLevel && persona.stats.level > maxLevel) return false;
		if (
			search &&
			!persona.name.toLowerCase().includes(search.toLowerCase().trim())
		)
			return false;
		return true;
	});
};

export const getPersonaById = (id: string) =>
	personas.find((persona) => persona.id === id) ?? null;
