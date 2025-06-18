import { MuiThemeProvider } from './muiThemeProvider';
import { NotistackProvider } from './notistackProvider';
import { QueryProvider } from './queryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<MuiThemeProvider>
			<QueryProvider>
				<NotistackProvider>{children}</NotistackProvider>
			</QueryProvider>
		</MuiThemeProvider>
	);
};
