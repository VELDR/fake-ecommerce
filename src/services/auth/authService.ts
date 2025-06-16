import { LoginFormData } from '@/features/auth/schemas/loginSchema';
import { api } from '@/helpers/apiHelpers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authAPI = {
	login: async (credentials: LoginFormData) => {
		const { data } = await api.post(`${API_BASE_URL}/auth/login`, credentials);

		// Map usernames to ids for simulating login
		const userIdMap: Record<string, number> = {
			mor_2314: 2,
			johnd: 1,
			'william.j': 3,
			david_r: 4,
			john: 5,
		};

		const userId = userIdMap[credentials.username] || 1;
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
