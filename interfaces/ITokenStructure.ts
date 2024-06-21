export interface ITokenStructure {
	access: { expires: Date; token: string };
	refresh: { expires: Date; token: string };
}

export interface IRefreshTokenStructure {
	tokens: ITokenStructure | Error;
}