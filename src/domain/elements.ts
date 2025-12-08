export enum DamageType {
	Physical = 'physical',
	Magical = 'magical',
	Support = 'support',
}

export enum Element {
	Physical = 'physical',
	Gun = 'gun',
	Fire = 'fire',
	Ice = 'ice',
	Electric = 'electric',
	Wind = 'wind',
	Psy = 'psy',
	Nuclear = 'nuclear',
	Bless = 'bless',
	Curse = 'curse',
	Almighty = 'almighty',
}

export enum Affinity {
	Weak = 'weak',
	Neutral = 'neutral',
	Resist = 'resist',
	Null = 'null',
	Drain = 'drain',
	Repel = 'repel',
}

export type ElementAffinityMap = Partial<Record<Element, Affinity>>;
