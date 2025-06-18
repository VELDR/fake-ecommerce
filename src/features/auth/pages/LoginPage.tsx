'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';

import { useHydration } from '@/hooks/useHydration';
import { useAuthStore } from '@/store/authStore';

import { LoginForm } from '../components/LoginForm';

const LoginPage = () => {
	const { isAuthenticated } = useAuthStore();
	const router = useRouter();
	const isHydrated = useHydration();

	useEffect(() => {
		if (isHydrated && isAuthenticated) {
			router.push('/');
		}
	}, [isHydrated, isAuthenticated, router]);

	if (isHydrated && isAuthenticated) {
		return null;
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				px: 2,
			}}
		>
			<LoginForm />
		</Box>
	);
};

export default LoginPage;
