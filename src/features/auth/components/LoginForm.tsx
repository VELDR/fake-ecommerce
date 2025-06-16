'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	Alert,
	Box,
	Button,
	Divider,
	IconButton,
	InputAdornment,
	Paper,
	Typography,
} from '@mui/material';

import { FormInput } from '@/components/ui/FormInput';
import {
	LoginFormData,
	loginSchema,
} from '@/features/auth/schemas/loginSchema';
import { useAuth } from '@/hooks/api/useAuth';
import { useAuthStore } from '@/store/authStore';
import { capitalizeFirstLetter } from '@/utils/general';

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { login, isPending } = useAuth();
	const { error, clearError } = useAuthStore();

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (data: LoginFormData) => {
		clearError();
		login(data, {
			onSuccess: () => {
				router.push('/');
			},
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Paper
			elevation={24}
			sx={{
				p: 5,
				width: '100%',
				maxWidth: 450,
				borderRadius: 4,
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				background: 'rgba(255, 255, 255, 0.95)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.2)',
			}}
		>
			{/* Brand Header */}
			<Box sx={{ textAlign: 'center' }}>
				<Typography
					variant="h3"
					component="h1"
					fontWeight={700}
					sx={{
						background: 'linear-gradient(45deg, #667eea, #764ba2)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					UnrealStuff
				</Typography>
				<Typography variant="body2" color="text.secondary" fontWeight={500}>
					Unreal E-commerce Experience
				</Typography>
			</Box>

			<Divider />

			{error && (
				<Alert
					severity="error"
					sx={{
						fontWeight: 500,
					}}
				>
					{capitalizeFirstLetter(error)}.
				</Alert>
			)}

			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
			>
				<FormInput
					name="username"
					control={control}
					label="Username"
					placeholder="Enter your username"
				/>

				<FormInput
					name="password"
					control={control}
					label="Password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Enter your password"
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={togglePasswordVisibility}
										edge="end"
										sx={{
											color: 'primary.main',
										}}
									>
										{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					disabled={!isValid || isPending}
					sx={{
						py: 1.8,
						textTransform: 'none',
						fontSize: '1.1rem',
						fontWeight: 600,
						borderRadius: 2,
						background: 'linear-gradient(45deg, #667eea, #764ba2)',
						'&:hover': {
							background: 'linear-gradient(45deg, #5a6fd8, #6a3f89)',
						},
						'&:disabled': {
							background: 'rgba(0, 0, 0, 0.12)',
						},
					}}
				>
					{isPending ? 'Signing in...' : 'Sign In'}
				</Button>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{ textAlign: 'center', mt: 2 }}
				>
					Don&apos;t have an account?
				</Typography>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{ textAlign: 'center' }}
				>
					You can&apos;t create an account anyway.
				</Typography>
			</Box>
		</Paper>
	);
}
