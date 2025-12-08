import {
	Element,
	ElementAffinityMap,
	Persona,
	Arcana,
	Affinity,
} from '@/domain';

const makeAffinities = (affinities: ElementAffinityMap): ElementAffinityMap =>
	affinities;

export const personas: Persona[] = [
	{
		id: 'pixie',
		name: 'Pixie',
		arcana: Arcana.Lovers,
		description: 'A playful fairy often aiding new Persona users.',
		stats: {
			level: 2,
			hp: 60,
			sp: 40,
			strength: 3,
			magic: 6,
			endurance: 3,
			agility: 7,
			luck: 5,
		},
		affinities: makeAffinities({
			[Element.Electric]: Affinity.Weak,
			[Element.Wind]: Affinity.Resist,
		}),
		skills: [
			{ skillId: 'zio', learnLevel: 2 },
			{ skillId: 'dia', learnLevel: 3 },
		],
		sourceGame: 'Persona 5',
	},
	{
		id: 'jack_frost',
		name: 'Jack Frost',
		arcana: Arcana.Magician,
		description: "The series' iconic snow fairy.",
		stats: {
			level: 11,
			hp: 180,
			sp: 90,
			strength: 9,
			magic: 14,
			endurance: 10,
			agility: 12,
			luck: 11,
		},
		affinities: makeAffinities({
			[Element.Fire]: Affinity.Weak,
			[Element.Ice]: Affinity.Resist,
		}),
		skills: [
			{ skillId: 'bufu', learnLevel: 11 },
			{ skillId: 'tarukaja', learnLevel: 12 },
		],
		sourceGame: 'Persona 5',
	},
	{
		id: 'ara_mitama',
		name: 'Ara Mitama',
		arcana: Arcana.Chariot,
		description: 'A mighty spirit embodying courage.',
		stats: {
			level: 15,
			hp: 260,
			sp: 100,
			strength: 17,
			magic: 10,
			endurance: 16,
			agility: 12,
			luck: 10,
		},
		affinities: makeAffinities({
			[Element.Fire]: Affinity.Resist,
			[Element.Electric]: Affinity.Weak,
			[Element.Physical]: Affinity.Resist,
		}),
		skills: [
			{ skillId: 'agi', learnLevel: 15 },
			{ skillId: 'tarukaja', learnLevel: 17 },
		],
		sourceGame: 'Persona 5',
	},
];

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
