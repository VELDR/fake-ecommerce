'use client';

import Link from 'next/link';

import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';

import { useCartStore } from '@/store/cartStore';

interface CartSummaryProps {
	onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
	const { totalItems, totalPrice } = useCartStore();

	const subtotal = totalPrice;
	const tax = subtotal * 0.05; // 5% tax
	const total = subtotal + tax;

	return (
		<Card
			sx={{
				position: 'sticky',
				top: 24,
				height: 'fit-content',
			}}
		>
			<CardContent sx={{ p: 3 }}>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 700,
						mb: 2,
						color: 'primary.main',
					}}
				>
					Order Summary
				</Typography>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					{totalItems} item{totalItems !== 1 ? 's' : ''} in cart
				</Typography>

				<Divider sx={{ my: 2 }} />

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="body2">Subtotal:</Typography>
						<Typography variant="body2">${subtotal.toFixed(2)}</Typography>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="body2">Tax (5%):</Typography>
						<Typography variant="body2">${tax.toFixed(2)}</Typography>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="body2">Shipping:</Typography>
						<Typography variant="body2" color="success.main">
							FREE
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 1.5,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Total:
					</Typography>
					<Typography
						variant="h6"
						sx={{ fontWeight: 700, color: 'primary.main' }}
					>
						${total.toFixed(2)}
					</Typography>
				</Box>

				<Button
					variant="contained"
					fullWidth
					size="large"
					onClick={onCheckout}
					sx={{
						py: 1.5,
						fontSize: '1rem',
						fontWeight: 600,
						mb: 2,
					}}
				>
					Proceed to Checkout
				</Button>

				<Button
					variant="outlined"
					fullWidth
					size="large"
					component={Link}
					href="/"
					sx={{
						py: 1.5,
						fontSize: '1rem',
						fontWeight: 600,
					}}
				>
					Continue Shopping
				</Button>
			</CardContent>
		</Card>
	);
}
