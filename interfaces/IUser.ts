import {ITokenStructure} from "./ITokenStructure.ts";
import {Role} from "@qaswa/configs";

export interface IUserStructure {
	id: string;
	username: string;
	password: string;
	role: string;
	isDisabled: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ILoginStructure {
	tokens: ITokenStructure | Error;
	user: IUserStructure;
}

export interface ICreateUserStructure {
	username: string;
	password: string;
	role: Role;
	isDisabled: boolean;
}