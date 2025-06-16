'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';

import { useAuthStore } from '@/store/authStore';
import { formatFullName, getFullNameInitials } from '@/utils/general';

export function Navbar() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { user, logout, isAuthenticated } = useAuthStore();
	const router = useRouter();

	const firstName = user?.name?.firstname || '';
	const lastName = user?.name?.lastname || '';

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		handleMenuClose();
		router.push('/login');
	};

	const displayName =
		user?.name?.firstname && user?.name?.lastname
			? formatFullName(user.name.firstname, user.name.lastname)
			: user?.username;

	return (
		<AppBar position="static" elevation={1}>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					UnrealStuff
				</Typography>

				{isAuthenticated ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography variant="body2" color="inherit">
							{displayName}
						</Typography>
						<IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
							<Avatar
								sx={{
									bgcolor: 'secondary.main',
									width: 40,
									height: 40,
								}}
							>
								{getFullNameInitials(firstName, lastName)}
							</Avatar>
						</IconButton>
					</Box>
				) : (
					<Button
						component="a"
						variant="outlined"
						color="inherit"
						href="/login"
					>
						Login
					</Button>
				)}

				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
