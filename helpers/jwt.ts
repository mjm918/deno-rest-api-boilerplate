import { create, Status, verify } from "@qaswa/deps";
import type { Header, Payload } from "@qaswa/deps";
import { throwError } from "@qaswa/middlewares";

const key = await crypto.subtle.generateKey(
	{ name: 'HMAC', hash: 'SHA-512' },
	true,
	['sign', 'verify'],
);

export class JwtHelper {
	/**
	 * Generate JWT token
	 * @param exp Expiry
	 * @param id
	 * @returns String Returns JWT
	 */
	public static getToken(
		exp: number,
		id: string,
	): Promise<string> {
		const now = Date.now(); // in millis
		const header: Header = {
			alg: 'HS512',
			typ: 'JWT',
		};
		const payload: Payload = {
			iss: 'deno_rest',
			iat: now,
			id,
			exp,
		};

		return create(header, payload, key);
	}

	/**
	 * Validates JWT and returns JWT payload
	 * @param token
	 * @param type
	 * @returns Promise<Payload | Error> Returns JWT payload
	 */
	public static async getJwtPayload(
		token: string,
		type = 'access_token',
	): Promise<Payload | Error> {
		try {
			return await verify(token, key);
		} catch (_e) {
			const tokenType = (type === 'access_token')
				? 'access_token'
				: 'refresh_token';
			return throwError({
				status: Status.Unauthorized,
				name: 'Unauthorized',
				path: tokenType,
				param: tokenType,
				message: `${tokenType} is invalid`,
				type: 'Unauthorized',
			});
		}
	}
}
