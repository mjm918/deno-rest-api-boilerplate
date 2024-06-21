import { Application, oakCors, assignModule, RateLimiter, SocketIoServer, DenoServe, createRedisClient, createRedisAdapter } from "@qaswa/deps";
import {useErrorHandler, log, useLogHandler} from "@qaswa/middlewares";
import { vars, corsOptions } from "@qaswa/configs";
import { DefaultAppModule, DefaultAppWs } from "@qaswa/modules";

/// ----- Essentials ------
const rateLimit = RateLimiter({
	windowMs: 1000,
	max: 1,
	headers: true,
	message: "Too many requests. Request rejected.",
	statusCode: 429,
});
const [pubClient, subClient] = await Promise.all([
	createRedisClient({
		hostname: vars.redisHost,
		port: vars.redisPort,
		username: vars.redisUser,
		password: vars.redisPw
	}),
	createRedisClient({
		hostname: vars.redisHost,
		port: vars.redisPort,
		username: vars.redisUser,
		password: vars.redisPw
	}),
]);
const io = new SocketIoServer({
	adapter: createRedisAdapter(pubClient, subClient),
});
/// ----- Essentials ------


const app: Application = new Application();

app.use(useLogHandler);
app.use(useErrorHandler);
app.use(oakCors(corsOptions));
app.use(await rateLimit);
app.use(assignModule(DefaultAppModule));


if (import.meta.main) {
	const handler = io.handler(async (req) => {
		return await app.handle(req) || new Response(null, { status: 404 });
	});
	DefaultAppWs(io)
	await DenoServe(handler, {
		port: vars.port,
		onListen({hostname, port}) {
			log.info(`⚠️Server Running in [${vars.isDev ? "development" : "production"}] mode`);
			log.info(`🎉Server Listening @ ${hostname}:${port}`);
		},
		onError(error: unknown) {
			log.error((error as Error).message);
			return new Response(null, { status: 500 });
		},
	});
}

export { app };