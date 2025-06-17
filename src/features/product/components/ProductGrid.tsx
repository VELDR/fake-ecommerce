'use client';

import { useMemo, useState } from 'react';

import { Alert, Box, CircularProgress, Typography } from '@mui/material';

import { useProducts } from '@/hooks/api/useProducts';
import type { Product } from '@/types/product';

import { FilterSearch } from './FilterSearch';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
	const { data: products, isLoading, error } = useProducts();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState('default');

	const filteredAndSortedProducts = useMemo(() => {
		if (!products) return [];

		let filtered = products.filter((product: Product) => {
			const matchesSearch =
				searchQuery === '' ||
				product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.category.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesCategory =
				selectedCategories.length === 0 ||
				selectedCategories.includes(product.category);

			return matchesSearch && matchesCategory;
		});

		switch (sortBy) {
			case 'price-low-high':
				filtered = filtered.sort((a: Product, b: Product) => a.price - b.price);
				break;
			case 'price-high-low':
				filtered = filtered.sort((a: Product, b: Product) => b.price - a.price);
				break;
			case 'name-a-z':
				filtered = filtered.sort((a: Product, b: Product) =>
					a.title.localeCompare(b.title)
				);
				break;
			case 'name-z-a':
				filtered = filtered.sort((a: Product, b: Product) =>
					b.title.localeCompare(a.title)
				);
				break;
			default:
				break;
		}

		return filtered;
	}, [products, searchQuery, selectedCategories, sortBy]);

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '90vh',
				}}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (error) {
		return (
			<Alert severity="error" sx={{ my: 4 }}>
				Failed to load products. Please try again later.
			</Alert>
		);
	}

	return (
		<Box sx={{ py: 4 }}>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					fontWeight: 700,
					mb: 1,
					textAlign: 'center',
					color: 'primary.main',
				}}
			>
				Imagined Goods
			</Typography>

			<Typography
				variant="subtitle1"
				sx={{
					mb: 4,
					textAlign: 'center',
					color: 'text.secondary',
				}}
			>
				Stuff so good, we had to make it up
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
					gap: 4,
					alignItems: { lg: 'flex-start' },
					position: 'relative',
				}}
			>
				<FilterSearch
					searchQuery={searchQuery}
					selectedCategories={selectedCategories}
					sortBy={sortBy}
					onSearchChange={setSearchQuery}
					onCategoryChange={setSelectedCategories}
					onSortChange={setSortBy}
					resultsCount={filteredAndSortedProducts.length}
					totalCount={products?.length || 0}
				/>

				{/* Product Cards */}
				<Box sx={{ flex: 1, minWidth: 0 }}>
					{filteredAndSortedProducts.length === 0 ? (
						<Box
							sx={{
								textAlign: 'center',
								py: 8,
								backgroundColor: '#f9f9f9',
								borderRadius: 2,
							}}
						>
							<Typography variant="h6" color="text.secondary">
								No products found
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Try adjusting your search or filter
							</Typography>
						</Box>
					) : (
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: {
									xs: '1fr',
									sm: 'repeat(2, 1fr)',
									md: 'repeat(3, 1fr)',
									lg: 'repeat(2, 1fr)',
									xl: 'repeat(3, 1fr)',
								},
								gap: 3,
							}}
						>
							{filteredAndSortedProducts.map((product: Product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}
