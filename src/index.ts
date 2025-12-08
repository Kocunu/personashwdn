import { Elysia } from 'elysia';
import { registerHealthRoutes } from './routes/health';
import { registerPersonaRoutes } from './routes/personas';

const app = new Elysia();

registerHealthRoutes(app);
registerPersonaRoutes(app);

app.listen(3000, ({ url }) => {
	console.log(`Persona backend running at ${url}`);
});
