import { MuiThemeProvider } from './muiThemeProvider';
import { QueryProvider } from './queryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<MuiThemeProvider>
			<QueryProvider>{children}</QueryProvider>
		</MuiThemeProvider>
	);
};
