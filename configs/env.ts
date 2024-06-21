import {loadSync} from "@qaswa/deps";

const env: string = Deno.env.get("ENV") || "development";
const envPath: string = `environments/.env.${env}`.toString();

loadSync({
	envPath,
	export: true,
});

export const vars: {
	isDev: boolean
	appName: string
	jwtAccessExpiration: number
	jwtRefreshExpiration: number
	ip: string
	host: string
	port: number
	protocol: string
	redisHost: string
	redisPort: number
	redisUser: string
	redisPw: string
	url: string
} = {
	isDev: env === 'development',
	appName: Deno.env.get('APP_NAME') as unknown as string,
	jwtAccessExpiration: Number(
		Deno.env.get('JWT_ACCESS_TOKEN_EXP'),
	) as unknown as number,
	jwtRefreshExpiration: Number(
		Deno.env.get('JWT_REFRESH_TOKEN_EXP'),
	) as unknown as number,
	ip: Deno.env.get('IP') as unknown as string,
	host: Deno.env.get('HOST') as unknown as string,
	port: Number(Deno.env.get('PORT') as unknown as number),
	protocol: Deno.env.get('PROTOCOL') as unknown as string,
	redisHost: Deno.env.get('REDIS_HOST') as unknown as string,
	redisPort: Number(Deno.env.get('REDIS_PORT') as unknown as number),
	redisUser: Deno.env.get('REDIS_USER') as unknown as string,
	redisPw: Deno.env.get('REDIS_PW') as unknown as string,
	url: `${Deno.env.get('PROTOCOL') as unknown as string}://${Deno.env.get(
		'HOST',
	) as unknown as string}:${Deno.env.get('PORT') as unknown as number}`,
};