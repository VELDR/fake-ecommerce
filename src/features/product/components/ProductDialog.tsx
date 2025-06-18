'use client';

import Image from 'next/image';

import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	Rating,
	Typography,
} from '@mui/material';

import type { CartItem, Product } from '@/types/product';
import { capitalizeFirstLetter } from '@/utils/general';

interface ProductDialogProps {
	product: CartItem | Product | null;
	open: boolean;
	onClose: () => void;
}

export const ProductDialog = ({
	product,
	open,
	onClose,
}: ProductDialogProps) => {
	if (!product) return null;

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogContent>
				<Box
					sx={{
						display: 'flex',
						gap: 3,
						flexDirection: { xs: 'column', md: 'row' },
					}}
				>
					<Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: 300 } }}>
						<Box
							sx={{
								width: '100%',
								height: { md: 300, xs: 200 },
								border: '1px solid',
								borderColor: 'divider',
								borderRadius: 1,
								position: 'relative',
							}}
						>
							<Image
								src={product.image}
								alt={product.title}
								fill
								style={{ objectFit: 'contain' }}
							/>
						</Box>
					</Box>
					<Box
						sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
					>
						<Box>
							<Typography
								variant="h6"
								component="h3"
								sx={{ fontWeight: 600, mb: 1 }}
							>
								{product.title}
							</Typography>
							<Chip
								label={capitalizeFirstLetter(product.category)}
								variant="outlined"
							/>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Rating
								value={product.rating || 0}
								precision={0.1}
								size="small"
								readOnly
							/>
							<Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
								({product.rating})
							</Typography>
						</Box>
						<Typography
							variant="h5"
							color="primary.main"
							sx={{ fontWeight: 700 }}
						>
							${product.price.toFixed(2)}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{product.description}
						</Typography>
						{'quantity' in product && (
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<Typography variant="body2">Quantity in cart:</Typography>
								<Typography variant="body2" sx={{ fontWeight: 600 }}>
									{product.quantity}
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
