'use client';

import { useMutation } from '@tanstack/react-query';

import { LoginFormData } from '@/features/auth/schemas/loginSchema';
import { authAPI } from '@/services/auth/authService';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
	const { setUser, setError, setSuccessMessage } = useAuthStore();

	const { mutate, isPending, error } = useMutation({
		mutationFn: (credentials: LoginFormData) => authAPI.login(credentials),
		onMutate: () => {
			setError(null);
		},
		onSuccess: (data) => {
			setUser(data.user);
			setSuccessMessage('Login successful!');
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			const errorMessage = error?.response?.data || 'Login failed.';
			setError(errorMessage);
		},
	});

	return {
		login: mutate,
		isPending,
		error,
	};
};
