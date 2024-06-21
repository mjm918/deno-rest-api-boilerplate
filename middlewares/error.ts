import { Status, Context } from "@qaswa/deps";
import {ICustomError, IHTTPError} from "@qaswa/interfaces";
import {log} from "@qaswa/middlewares";
import {State} from "oak/application.ts";

/**
 * Throws Error with provided params
 * @param options
 * @throws Error Throws Error
 */
export const throwError = (options: IHTTPError): Error => {
	throw options;
};

/**
 * Error Handler Middleware function
 * @param ctx
 * @param next
 * @returns Promise<void>
 */
export const useErrorHandler = async (
	ctx: Context<State, Record<string, unknown>>,
	next: () => Promise<unknown>,
): Promise<void> => {
	try {
		await next();
	} catch (err) {
		const error: ICustomError = err;
		const status: number = error.status || error.statusCode ||
			Status.InternalServerError;
		const message: string = error.message || 'An error occurred';
		const name: string = error.name || 'Error';
		const path: string = error.path || 'Unknown path';
		const type: string = error.type || 'Unknown type';

		ctx.response.status = status;
		log.error(error);
		if (Deno.env.get('ENV') === 'production') {
			ctx.response.body = { message, status };
		} else {
			ctx.response.body = { message, name, path, type, status };
		}
	}
};