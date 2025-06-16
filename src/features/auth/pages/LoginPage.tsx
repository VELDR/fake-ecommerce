import { Box } from '@mui/material';

import { LoginForm } from '../components/LoginForm';

const LoginPage = () => {
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
