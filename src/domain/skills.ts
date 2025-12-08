import { DamageType, Element } from './elements';

export type SkillId = string;

export enum SkillTarget {
	SingleEnemy = 'single_enemy',
	AllEnemies = 'all_enemies',
	SingleAlly = 'single_ally',
	AllAllies = 'all_allies',
	Self = 'self',
}

export enum SkillCostType {
	HP = 'hp',
	SP = 'sp',
	None = 'none',
}

export interface SkillCost {
	type: SkillCostType;
	value: number;
}

export interface SkillEffectFlags {
	isAilment?: boolean;
	isBuff?: boolean;
	isDebuff?: boolean;
	isHealing?: boolean;
	unique?: boolean;
}

export interface Skill {
	id: SkillId;
	name: string;
	levelRequirement?: number;
	element: Element;
	damageType: DamageType;
	power?: number;
	accuracy?: number;
	critRate?: number;
	target: SkillTarget;
	cost: SkillCost;
	description: string;
	flags?: SkillEffectFlags;
	tags?: string[];
}
