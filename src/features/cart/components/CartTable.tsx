'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

import { Add, Clear, Close, FilterList, Remove } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	IconButton,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';

import { useCartActions } from '@/hooks/useCartActions';
import { useCartStore } from '@/store/cartStore';
import type { CartItem } from '@/types/product';
import { capitalizeFirstLetter } from '@/utils/general';

interface CartTableProps {
	onViewProduct: (item: CartItem) => void;
}

export function CartTable({ onViewProduct }: CartTableProps) {
	const { items, clearCart } = useCartStore();
	const { handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveItem } =
		useCartActions();

	const [page, setPage] = useState(0);
	const [rowsPerPage] = useState(5);
	const [filter, setFilter] = useState('');
	const [sortBy, setSortBy] = useState<'name' | 'price' | 'subtotal' | null>(
		null
	);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const filteredAndSortedItems = useMemo(() => {
		const result = items.filter((item) =>
			item.title.toLowerCase().includes(filter.toLowerCase())
		);

		// Sort only when a column is selected
		if (sortBy) {
			result.sort((a, b) => {
				let comparison = 0;
				switch (sortBy) {
					case 'name':
						comparison = a.title.localeCompare(b.title);
						break;
					case 'price':
						comparison = a.price - b.price;
						break;
					case 'subtotal':
						comparison = a.price * a.quantity - b.price * b.quantity;
						break;
				}
				return sortOrder === 'asc' ? comparison : -comparison;
			});
		} else {
			result.reverse();
		}

		return result;
	}, [items, filter, sortBy, sortOrder]);

	const paginatedItems = useMemo(() => {
		const startIndex = page * rowsPerPage;
		return filteredAndSortedItems.slice(startIndex, startIndex + rowsPerPage);
	}, [filteredAndSortedItems, page, rowsPerPage]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleSort = (column: 'name' | 'price' | 'subtotal') => {
		if (sortBy === column) {
			// If clicking the same column, toggle order or clear sorting
			if (sortOrder === 'asc') {
				setSortOrder('desc');
			} else {
				// Clear sorting (return to default order)
				setSortBy(null);
				setSortOrder('asc');
			}
		} else {
			setSortBy(column);
			setSortOrder('asc');
		}
	};

	return (
		<Paper sx={{ p: 3 }}>
			<Box
				sx={{
					mb: 3,
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}
			>
				<TextField
					size="small"
					placeholder="Filter by product name..."
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<FilterList />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setFilter('')}
										disabled={!filter}
										size="small"
									>
										<Clear fontSize="small" />
									</IconButton>
								</InputAdornment>
							),
						},
					}}
					sx={{ minWidth: 250 }}
				/>
				<Button
					variant="outlined"
					color="error"
					size="small"
					onClick={clearCart}
				>
					Clear cart
				</Button>
			</Box>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: 'bold',
									cursor: 'pointer',
									'&:hover': { backgroundColor: 'grey.100' },
								}}
								onClick={() => handleSort('name')}
							>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									Item
									{sortBy === 'name' && (
										<Box sx={{ ml: 1 }}>{sortOrder === 'asc' ? '↑' : '↓'}</Box>
									)}
								</Box>
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									cursor: 'pointer',
									'&:hover': { backgroundColor: 'grey.100' },
								}}
								onClick={() => handleSort('price')}
							>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									Price
									{sortBy === 'price' && (
										<Box sx={{ ml: 1 }}>{sortOrder === 'asc' ? '↑' : '↓'}</Box>
									)}
								</Box>
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									cursor: 'pointer',
									'&:hover': { backgroundColor: 'grey.100' },
								}}
								onClick={() => handleSort('subtotal')}
							>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									Subtotal
									{sortBy === 'subtotal' && (
										<Box sx={{ ml: 1 }}>{sortOrder === 'asc' ? '↑' : '↓'}</Box>
									)}
								</Box>
							</TableCell>
							<TableCell sx={{ width: 50 }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedItems.map((item) => (
							<TableRow key={item.id} hover>
								<TableCell>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 2,
										}}
									>
										<Box
											sx={{
												width: 60,
												height: 60,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												border: '1px solid',
												borderColor: '#f0f0f0',
												borderRadius: 1,
												overflow: 'hidden',
												flexShrink: 0,
												position: 'relative',
											}}
										>
											<Image
												src={item.image}
												alt={item.title}
												fill
												style={{
													objectFit: 'contain',
													backgroundColor: 'white',
												}}
											/>
										</Box>
										<Box sx={{ flexGrow: 1, minWidth: 0 }}>
											<Typography
												variant="body2"
												title={item.title}
												sx={{
													fontWeight: 500,
													display: '-webkit-box',
													WebkitLineClamp: 2,
													WebkitBoxOrient: 'vertical',
													overflow: 'hidden',
													cursor: 'pointer',
													'&:hover': { color: 'primary.main' },
												}}
												onClick={() => onViewProduct(item)}
											>
												{item.title}
											</Typography>
											<Chip
												label={capitalizeFirstLetter(item.category)}
												size="small"
												variant="outlined"
												sx={{ mt: 0.5, fontSize: '0.7rem' }}
											/>
										</Box>
									</Box>
								</TableCell>
								<TableCell>
									<Typography sx={{ fontWeight: 500 }}>
										${item.price.toFixed(2)}
									</Typography>
								</TableCell>
								<TableCell>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<IconButton
											size="small"
											onClick={() =>
												handleDecreaseQuantity(item.id, item.quantity)
											}
											sx={{
												border: 1,
												borderColor: 'divider',
											}}
										>
											<Remove fontSize="small" />
										</IconButton>
										<Typography
											sx={{
												minWidth: '2ch',
												textAlign: 'center',
												fontWeight: 500,
											}}
										>
											{item.quantity}
										</Typography>
										<IconButton
											size="small"
											onClick={() =>
												handleIncreaseQuantity(item.id, item.quantity)
											}
											sx={{
												border: 1,
												borderColor: 'divider',
											}}
										>
											<Add fontSize="small" />
										</IconButton>
									</Box>
								</TableCell>
								<TableCell>
									<Typography sx={{ fontWeight: 600, color: 'primary.main' }}>
										${(item.price * item.quantity).toFixed(2)}
									</Typography>
								</TableCell>
								<TableCell>
									<IconButton
										size="small"
										onClick={() => handleRemoveItem(item.id)}
										color="error"
									>
										<Close fontSize="small" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				component="div"
				count={filteredAndSortedItems.length}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5]}
				sx={{ borderTop: 1, borderColor: 'divider' }}
			/>
		</Paper>
	);
}
