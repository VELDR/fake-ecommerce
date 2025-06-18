import jwt from 'jsonwebtoken';

import { LoginFormData } from '@/features/auth/schemas/loginSchema';
import { api } from '@/helpers/apiHelpers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authAPI = {
	login: async (credentials: LoginFormData) => {
		const { data } = await api.post(`${API_BASE_URL}/auth/login`, credentials);
		const decodedToken = jwt.decode(data.token);
		const userId = decodedToken?.sub || 1;

		const userResponse = await api.get(`${API_BASE_URL}/users/${userId}`);

		const userData = {
			id: userResponse.data.id,
			username: userResponse.data.username,
			email: userResponse.data.email,
			name: {
				firstname: userResponse.data.name.firstname,
				lastname: userResponse.data.name.lastname,
			},
		};

		return { ...data, user: userData };
	},
};
