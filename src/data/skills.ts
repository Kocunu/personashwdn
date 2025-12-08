import {
	DamageType,
	Element,
	Skill,
	SkillCostType,
	SkillTarget,
} from '@/domain';

export const skills: Skill[] = [
	{
		id: 'agi',
		name: 'Agi',
		element: Element.Fire,
		damageType: DamageType.Magical,
		power: 80,
		accuracy: 0.9,
		target: SkillTarget.SingleEnemy,
		cost: { type: SkillCostType.SP, value: 4 },
		description: 'Light fire damage to one foe.',
	},
	{
		id: 'bufu',
		name: 'Bufu',
		element: Element.Ice,
		damageType: DamageType.Magical,
		power: 80,
		accuracy: 0.9,
		target: SkillTarget.SingleEnemy,
		cost: { type: SkillCostType.SP, value: 4 },
		description: 'Light ice damage to one foe.',
	},
	{
		id: 'dia',
		name: 'Dia',
		element: Element.Bless,
		damageType: DamageType.Support,
		target: SkillTarget.SingleAlly,
		cost: { type: SkillCostType.SP, value: 3 },
		description: 'Slightly restores HP to one ally.',
		flags: { isHealing: true },
	},
	{
		id: 'tarukaja',
		name: 'Tarukaja',
		element: Element.Almighty,
		damageType: DamageType.Support,
		target: SkillTarget.AllAllies,
		cost: { type: SkillCostType.SP, value: 8 },
		description: "Raises party's attack for 3 turns.",
		flags: { isBuff: true },
	},
	{
		id: 'zio',
		name: 'Zio',
		element: Element.Electric,
		damageType: DamageType.Magical,
		power: 80,
		accuracy: 0.9,
		target: SkillTarget.SingleEnemy,
		cost: { type: SkillCostType.SP, value: 4 },
		description: 'Light electric damage to one foe.',
	},
];

const skillMap = new Map(skills.map((s) => [s.id, s]));

export const getSkillById = (id: string) => skillMap.get(id) ?? null;
