'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ShoppingCart } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from '@mui/material';

import { Footer } from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import { CartSnackbar } from '@/features/cart/components/CartSnackbar';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { CartTable } from '@/features/cart/components/CartTable';
import { ProductDialog } from '@/features/product/components/ProductDialog';
import { useHydration } from '@/hooks/useHydration';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import type { CartItem } from '@/types/product';

const CartPage = () => {
	const { isAuthenticated } = useAuthStore();
	const { items, totalItems, clearCart } = useCartStore();
	const router = useRouter();

	const hasHydrated = useHydration();

	const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		if (hasHydrated && !isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated, router, hasHydrated]);

	const handleViewProduct = (item: CartItem) => {
		setSelectedProduct(item);
		setDialogOpen(true);
	};

	const handleCheckout = () => {
		clearCart();
		alert('Checkout successful!');
		router.push('/');
	};
	if (!hasHydrated) {
		return (
			<>
				<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
					<Navbar />
					<Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: '60vh',
							}}
						>
							<Typography variant="body1" color="text.secondary">
								Loading...
							</Typography>
						</Box>
					</Container>
				</Box>
				<Footer />
			</>
		);
	}

	if (!isAuthenticated) {
		return null;
	}
	return (
		<>
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
					<Box sx={{ mb: 4 }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								mb: 2,
								gap: 2,
							}}
						>
							<Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
								Your Imaginary Cart
							</Typography>
							{totalItems > 0 && (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: 32,
										color: 'primary.contrastText',
										fontWeight: 600,
										borderRadius: '100%',
										p: 0.5,
										backgroundColor: 'primary.light',
									}}
								>
									{totalItems}
								</Box>
							)}
						</Box>
						<Divider />
					</Box>
					{items.length === 0 ? (
						<Paper sx={{ p: 4, textAlign: 'center' }}>
							<ShoppingCart
								sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
							/>
							<Typography variant="h5" gutterBottom>
								Nothing fake here yet!
							</Typography>
							<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
								Start pretending to shop for things that don&apos;t exist!
							</Typography>
							<Button
								variant="contained"
								size="large"
								component={Link}
								href="/"
								sx={{ px: 4 }}
							>
								Start Shopping
							</Button>
						</Paper>
					) : (
						<Box
							sx={{
								display: 'flex',
								gap: 3,
								flexDirection: { xs: 'column', lg: 'row' },
							}}
						>
							<Box sx={{ flex: 1 }}>
								<CartTable onViewProduct={handleViewProduct} />
							</Box>

							<Box sx={{ width: { xs: '100%', lg: 320 } }}>
								<CartSummary onCheckout={handleCheckout} />
							</Box>
						</Box>
					)}
					<ProductDialog
						product={selectedProduct}
						open={dialogOpen}
						onClose={() => setDialogOpen(false)}
					/>{' '}
					<CartSnackbar />
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default CartPage;
