export interface IHTTPError {
	status: number;
	name: string;
	path: string;
	param: string;
	message: string;
	type: string;
}

export interface ICustomError extends Error {
	status?: number;
	statusCode?: number;
	path?: string;
	type?: string;
}
