import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';
import { registerHealthRoutes } from './routes/health';
import { registerPersonaRoutes } from './routes/personas';

const app = new Elysia().use(
	cors({
		origin: process.env.CLIENT_ORIGIN ?? '*',
	}),
);

registerHealthRoutes(app);
registerPersonaRoutes(app);

app.listen(3000, ({ url }) => {
	console.log(`Persona backend running at ${url}`);
});
