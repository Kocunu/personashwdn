import { Elysia, t } from 'elysia';

export const registerHealthRoutes = (app: Elysia) =>
	app.get(
		'/health',
		() => ({
			status: 'ok' as const,
			timestamp: new Date().toISOString(),
		}),
		{
			detail: {
				description: 'Basic health check',
			},
			response: t.Object({
				status: t.Literal('ok'),
				timestamp: t.String(),
			}),
		},
	);
