import {yup} from "qaswa/deps";
import {Role, ROLES_RANK} from "qaswa/configs";

export const createUserValidation = {
	body: yup.object({
		username: yup
			.string()
			.trim()
			.required(`username is required`),
		password: yup
			.string()
			.required()
			.min(6)
			.max(255),
		role: yup
			.string()
			.default(Role.USER)
			.oneOf(ROLES_RANK),
		isDisabled: yup
			.bool()
			.default(false),
	}),
};

export const meValidation = {};

export const getUserValidation = {
	params: yup.object({
		id: yup
			.string()
			.required()
			.trim(),
	}),
};

export const getUsersValidation = {};

export const updateUserValidation = {
	params: yup.object({
		id: yup
			.string()
			.required()
			.trim(),
	}),
	body: yup.object({
		username: yup
			.string()
			.min(3)
			.max(255)
			.trim(),
		role: yup
			.string()
			.default(Role.USER)
			.oneOf(ROLES_RANK),
		isDisabled: yup
			.bool(),
	}),
};

export const deleteUserValidation = {
	params: yup.object({
		id: yup
			.string()
			.required()
			.trim(),
	}),
};