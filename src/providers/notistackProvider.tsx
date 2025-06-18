'use client';

import { SnackbarProvider } from 'notistack';

export const NotistackProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			autoHideDuration={3000}
			preventDuplicate
		>
			{children}
		</SnackbarProvider>
	);
};
