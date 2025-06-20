'use client';

import { MouseEvent, useMemo } from 'react';

import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	IconButton,
	Rating,
	Typography,
} from '@mui/material';

import { useCartActions } from '@/hooks/useCartActions';
import { useHydration } from '@/hooks/useHydration';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product';

interface ProductCardProps {
	product: Product;
	onViewProduct: (product: Product) => void;
}

export function ProductCard({ product, onViewProduct }: ProductCardProps) {
	const { getItemQuantity } = useCartStore();
	const { handleAddToCart, handleIncreaseQuantity, handleDecreaseQuantity } =
		useCartActions();
	const isHydrated = useHydration();

	const cartQuantity = isHydrated ? getItemQuantity(product.id) : 0;

	const { rating, soldCount } = useMemo(() => {
		if (product.rating && product.soldCount) {
			return {
				rating: product.rating,
				soldCount: product.soldCount,
			};
		}

		return {
			randomRating: 0,
			soldCount: '0 sold',
		};
	}, [product]);

	const handleCartAction = (e: MouseEvent, action: () => void) => {
		e.stopPropagation();
		action();
	};

	return (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
				cursor: 'pointer',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: 8,
				},
			}}
			onClick={() => onViewProduct(product)}
		>
			<CardMedia
				component="img"
				height="240"
				image={product.image}
				alt={product.title}
				sx={{
					objectFit: 'contain',
					padding: 2,
					backgroundColor: 'grey.50',
				}}
			/>
			<CardContent
				sx={{
					flexGrow: 1,
					pb: 1,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Category Badge */}
				<Box sx={{ mb: 1 }}>
					<Chip
						label={product.category}
						size="small"
						variant="outlined"
						sx={{
							textTransform: 'capitalize',
							fontSize: '0.75rem',
							borderColor: 'primary.main',
							color: 'primary.main',
						}}
					/>
				</Box>

				{/* Product Title */}
				<Box
					sx={{
						mb: 1,
						minHeight: '2.5rem',
						display: 'flex',
						alignItems: 'flex-start',
					}}
				>
					<Typography
						variant="h6"
						component="h3"
						title={product.title}
						sx={{
							fontWeight: 600,
							fontSize: '1rem',
							lineHeight: 1.3,
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{product.title}
					</Typography>
				</Box>

				{/* Rating and Sold Count */}
				<Box sx={{ mb: 1 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
						<Rating value={rating} precision={0.1} size="small" readOnly />
						<Typography variant="body2" color="text.secondary">
							({rating})
						</Typography>
					</Box>

					<Typography variant="body2" color="text.secondary">
						{soldCount}
					</Typography>
				</Box>

				<Divider sx={{ mb: 1 }} />

				{/* Price */}
				<Typography
					variant="h5"
					component="div"
					sx={{
						fontWeight: 700,
						color: 'primary.main',
					}}
				>
					${product.price.toFixed(2)}
				</Typography>
			</CardContent>

			{/* Cart Actions */}
			<CardActions sx={{ p: 2, pt: 0 }}>
				{!isHydrated ? (
					<Button
						variant="contained"
						fullWidth
						disabled
						sx={{
							py: 1,
							fontWeight: 600,
						}}
					>
						Loading...
					</Button>
				) : cartQuantity === 0 ? (
					<Button
						variant="contained"
						fullWidth
						startIcon={<ShoppingCart />}
						onClick={(e) => handleCartAction(e, () => handleAddToCart(product))}
						sx={{
							py: 1,
							fontWeight: 600,
						}}
					>
						Add to Cart
					</Button>
				) : (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							gap: 1,
						}}
					>
						<IconButton
							onClick={(e) =>
								handleCartAction(e, () =>
									handleDecreaseQuantity(product.id, cartQuantity)
								)
							}
							sx={{
								border: 1,
								borderColor: 'primary.main',
								color: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.main',
									color: 'primary.contrastText',
								},
							}}
						>
							<Remove />
						</IconButton>

						<Typography
							variant="h6"
							sx={{
								fontWeight: 600,
								minWidth: '3ch',
								textAlign: 'center',
							}}
						>
							{cartQuantity}
						</Typography>

						<IconButton
							onClick={(e) =>
								handleCartAction(e, () =>
									handleIncreaseQuantity(product.id, cartQuantity)
								)
							}
							sx={{
								border: 1,
								borderColor: 'primary.main',
								color: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.main',
									color: 'primary.contrastText',
								},
							}}
						>
							<Add />
						</IconButton>
					</Box>
				)}
			</CardActions>
		</Card>
	);
}
