import { ElementAffinityMap } from './elements';
import { Skill } from './skills';

export type PersonaId = string;

export enum Arcana {
	Fool = 'fool',
	Magician = 'magician',
	Priestess = 'priestess',
	Empress = 'empress',
	Emperor = 'emperor',
	Hierophant = 'hierophant',
	Lovers = 'lovers',
	Chariot = 'chariot',
	Justice = 'justice',
	Hermit = 'hermit',
	Fortune = 'fortune',
	Strength = 'strength',
	HangedMan = 'hanged_man',
	Death = 'death',
	Temperance = 'temperance',
	Devil = 'devil',
	Tower = 'tower',
	Star = 'star',
	Moon = 'moon',
	Sun = 'sun',
	Judgement = 'judgement',
	Aeon = 'aeon',
	World = 'world',
}

export interface PersonaStats {
	level: number;
	hp: number;
	sp: number;
	strength: number;
	magic: number;
	endurance: number;
	agility: number;
	luck: number;
}

export interface PersonaSkillSlot {
	skillId: string;
	inherited?: boolean;
	learnLevel?: number;
}

export interface Persona {
	id: PersonaId;
	name: string;
	arcana: Arcana;
	race?: string;
	description?: string;
	image?: string;
	stats: PersonaStats;
	affinities: ElementAffinityMap;
	skills: PersonaSkillSlot[];
	sourceGame?: string;
}
