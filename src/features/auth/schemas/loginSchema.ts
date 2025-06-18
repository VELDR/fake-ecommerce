import * as yup from 'yup';

export const loginSchema = yup.object({
	username: yup
		.string()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
