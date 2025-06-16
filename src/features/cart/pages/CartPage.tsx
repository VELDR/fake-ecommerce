'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';

const CartPage = () => {
	const { isAuthenticated } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return null;
	}

	return <div>CartPage</div>;
};

export default CartPage;
