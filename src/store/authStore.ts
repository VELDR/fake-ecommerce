import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
	id: number;
	username: string;
	email?: string;
	name?: {
		firstname?: string;
		lastname?: string;
	};
}

interface AuthStore {
	user: User | null;
	isAuthenticated: boolean;
	error: string | null;
	successMessage: string | null;
	setUser: (user: User) => void;
	setError: (error: string | null) => void;
	setSuccessMessage: (message: string | null) => void;
	logout: () => void;
	clearError: () => void;
	clearSuccessMessage: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			error: null,
			successMessage: null,
			setUser: (user) =>
				set({
					user,
					isAuthenticated: true,
					error: null,
				}),
			setError: (error) => set({ error }),
			setSuccessMessage: (successMessage) => set({ successMessage }),
			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					error: null,
					successMessage: null,
				}),
			clearError: () => set({ error: null }),
			clearSuccessMessage: () => set({ successMessage: null }),
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
