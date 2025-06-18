'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ShoppingCart } from '@mui/icons-material';
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';

import { useHydration } from '@/hooks/useHydration';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { formatFullName, getFullNameInitials } from '@/utils/general';

export function Navbar() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { user, logout, isAuthenticated, setSuccessMessage } = useAuthStore();
	const { totalItems, clearCart } = useCartStore();
	const router = useRouter();
	const isHydrated = useHydration();

	const firstName = user?.name?.firstname || '';
	const lastName = user?.name?.lastname || '';

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		clearCart();
		logout();
		handleMenuClose();
		setSuccessMessage('Logout successful!');
		router.push('/login');
	};

	const displayName =
		user?.name?.firstname && user?.name?.lastname
			? formatFullName(user.name.firstname, user.name.lastname)
			: user?.username;

	return (
		<AppBar position="static" elevation={1}>
			<Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" component="a" href="/">
					UnrealStuff
				</Typography>

				{!isHydrated ? (
					<Box sx={{ width: 100, height: 40 }} />
				) : isAuthenticated ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<IconButton
							href="/cart"
							is="a"
							sx={{
								color: 'inherit',
							}}
						>
							<Badge badgeContent={totalItems} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
						<Typography variant="body2" color="inherit">
							{displayName}
						</Typography>
						<IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
							<Avatar
								sx={{
									backgroundColor: 'secondary.main',
									width: 30,
									height: 30,
									fontSize: '1rem',
								}}
							>
								{getFullNameInitials(firstName, lastName)}
							</Avatar>
						</IconButton>
					</Box>
				) : (
					<Button
						component={Link}
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
