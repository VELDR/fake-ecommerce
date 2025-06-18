'use client';

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: 'var(--font-poppins), Arial, sans-serif',
	},
	palette: {
		mode: 'light',
		primary: {
			main: '#764ba2',
			light: '#9c7bc7',
			dark: '#5a3680',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#f093fb',
			light: '#f5b8fc',
			dark: '#d66ef7',
			contrastText: '#000000',
		},
		error: {
			main: '#d32f2f',
			light: '#ef5350',
			dark: '#c62828',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#ed6c02',
			light: '#ff9800',
			dark: '#e65100',
			contrastText: '#ffffff',
		},
		info: {
			main: '#0288d1',
			light: '#03a9f4',
			dark: '#01579b',
			contrastText: '#ffffff',
		},
		success: {
			main: '#2e7d32',
			light: '#4caf50',
			dark: '#1b5e20',
			contrastText: '#ffffff',
		},
		grey: {
			50: '#fafafa',
			100: '#f5f5f5',
			200: '#eeeeee',
			300: '#e0e0e0',
			400: '#bdbdbd',
			500: '#9e9e9e',
			600: '#757575',
			700: '#616161',
			800: '#424242',
			900: '#212121',
		},
		text: {
			primary: '#212121',
			secondary: '#616161',
			disabled: '#bdbdbd',
		},
		background: {
			default: '#fafafa',
			paper: '#ffffff',
		},
		divider: 'rgba(0, 0, 0, 0.12)',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
				},
				'*::-webkit-scrollbar': {
					width: '4px',
					height: '4px',
				},
				'*::-webkit-scrollbar-thumb': {
					background: '#764ba2',
					borderRadius: '8px',
				},
				'*::-webkit-scrollbar-thumb:hover': {
					background: '#5a3680',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: '8px',
				},
			},
		},
	},
});

interface MuiThemeProviderProps {
	children: React.ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
	return (
		<AppRouterCacheProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
