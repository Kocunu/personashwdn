import { Elysia, Static, t } from 'elysia';
import { Arcana } from '@/domain';
import { getPersonaById, listPersonas } from '@/data';

const personaSchema = t.Object({
	id: t.String(),
	name: t.String(),
	arcana: t.Enum(Arcana),
	stats: t.Object({
		level: t.Number(),
		hp: t.Number(),
		sp: t.Number(),
		strength: t.Number(),
		magic: t.Number(),
		endurance: t.Number(),
		agility: t.Number(),
		luck: t.Number(),
	}),
	affinities: t.Record(t.String(), t.String()),
	skills: t.Array(
		t.Object({
			skillId: t.String(),
			inherited: t.Optional(t.Boolean()),
			learnLevel: t.Optional(t.Number()),
		}),
	),
	description: t.Optional(t.String()),
	sourceGame: t.Optional(t.String()),
	race: t.Optional(t.String()),
});

const personaQuerySchema = t.Object({
	search: t.Optional(t.String()),
	arcana: t.Optional(t.Enum(Arcana)),
	minLevel: t.Optional(t.Number({ minimum: 1 })),
	maxLevel: t.Optional(t.Number({ minimum: 1 })),
});

type PersonaQuery = Static<typeof personaQuerySchema>;

export const registerPersonaRoutes = (app: Elysia) =>
	app.group('/api/personas', (group) =>
		group
			.get(
				'/',
				({ query }: { query: PersonaQuery }) => {
					const personas = listPersonas(query);

					return { personas };
				},
				{
					query: personaQuerySchema,
					response: t.Object({
						personas: t.Array(personaSchema),
					}),
					detail: {
						description: 'List personas with optional filters',
					},
				},
			)
			.get(
				'/:id',
				({
					params,
					set,
				}: {
					params: { id: string };
					set: { status?: number | string };
				}) => {
					const persona = getPersonaById(params.id);
					if (!persona) {
						set.status = 404;
						return { error: 'Persona not found' };
					}
					return persona;
				},
				{
					params: t.Object({
						id: t.String(),
					}),
					response: t.Union([personaSchema, t.Object({ error: t.String() })]),
					detail: {
						description: 'Fetch persona by ID',
					},
				},
			),
	);
