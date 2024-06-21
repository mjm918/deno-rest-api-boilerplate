import { yup } from 'qaswa/deps';

export const loginValidation = {
	body: yup.object({
		username: yup
			.string()
			.trim()
			.required(`username is required`),
		password: yup
			.string()
			.required(`password is required`)
			.max(255),
	}),
};

export const refreshTokenValidation = {
	body: yup.object({
		refreshToken: yup
			.string()
			.trim()
			.required(`refresh_token is required`),
	}),
};