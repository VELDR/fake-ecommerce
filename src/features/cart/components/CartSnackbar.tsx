'use client';

import { useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { useCartStore } from '@/store/cartStore';

export function CartSnackbar() {
	const { showSuccessMessage, successMessage, setShowSuccessMessage } =
		useCartStore();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (showSuccessMessage && successMessage) {
			enqueueSnackbar(successMessage, {
				variant: 'success',
			});
			setShowSuccessMessage(false);
		}
	}, [
		showSuccessMessage,
		successMessage,
		enqueueSnackbar,
		setShowSuccessMessage,
	]);

	return null;
}
