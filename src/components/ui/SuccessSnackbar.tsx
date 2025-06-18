'use client';

import { Alert, Snackbar } from '@mui/material';

import { useAuthStore } from '@/store/authStore';

export function SuccessSnackbar() {
	const { successMessage, clearSuccessMessage } = useAuthStore();

	const handleClose = (
		_event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		clearSuccessMessage();
	};

	return (
		<Snackbar
			open={!!successMessage}
			autoHideDuration={4000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert onClose={handleClose} severity="success" variant="filled">
				{successMessage}
			</Alert>
		</Snackbar>
	);
}
