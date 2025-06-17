import { Container } from '@mui/material';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Navbar } from '@/components/ui/Navbar';
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
			<Navbar />
			<Container
				maxWidth="lg"
				sx={{ minHeight: '100vh', position: 'relative' }}
			>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ProductGrid />
				</HydrationBoundary>
			</Container>
		</>
	);
}
