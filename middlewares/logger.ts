import { Logger, Context, State, stdLog } from "@qaswa/deps";

stdLog.setup({
  handlers: {
    console: new stdLog.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    "socket.io": {
      level: "DEBUG",
      handlers: ["console"],
    },
    "engine.io": {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

export const log = new Logger();
export const useLogHandler = async (
	ctx: Context<State, Record<string, unknown>>,
	next: () => Promise<unknown>,
): Promise<void> => {
	log.info(`🔗New incoming connection : ${ctx.request.ip} → ${ctx.request.url} → ${JSON.stringify(ctx.request.method)} → ${JSON.stringify(ctx.request.headers)}`);
	await next();
}

await log.initFileLogger("./log", {
	rotate: true,
	maxBytes: 10 * 1024,
	maxBackupCount: 10,
});