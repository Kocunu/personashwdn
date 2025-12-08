import { Elysia } from 'elysia';
import { registerHealthRoutes } from './routes/health';

const app = new Elysia();

registerHealthRoutes(app);

app.listen(3000, ({ url }) => {
	console.log(`Persona backend running at ${url}`);
});
