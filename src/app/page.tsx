import { Box, Container } from '@mui/material';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Footer } from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import { CartSnackbar } from '@/features/cart/components/CartSnackbar';
import { ProductGrid } from '@/features/product/components/ProductGrid';
import { getQueryClient } from '@/lib/getQueryClient';
import { productAPI } from '@/services/product/productService';

export default async function Home() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['products'],
		queryFn: () => productAPI.getAllProducts(),
	});
	return (
		<>
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<Container
					maxWidth="lg"
					sx={{ position: 'relative', flexGrow: 1, py: 2 }}
				>
					<HydrationBoundary state={dehydrate(queryClient)}>
						<ProductGrid />
					</HydrationBoundary>
				</Container>
				<CartSnackbar />
			</Box>
			<Footer />
		</>
	);
}
