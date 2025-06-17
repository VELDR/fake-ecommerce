'use client';

import { useState } from 'react';

import {
	ExpandLess,
	ExpandMore,
	FilterList,
	Search,
	Sort,
} from '@mui/icons-material';
import {
	Box,
	Checkbox,
	Chip,
	Collapse,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import { CATEGORIES, SORT_OPTIONS } from '@/constants';

interface FilterSearchProps {
	searchQuery: string;
	selectedCategories: string[];
	sortBy: string;
	onSearchChange: (query: string) => void;
	onCategoryChange: (categories: string[]) => void;
	onSortChange: (sort: string) => void;
	resultsCount: number;
	totalCount: number;
}

export const FilterSearch = ({
	searchQuery,
	selectedCategories,
	sortBy,
	onSearchChange,
	onCategoryChange,
	onSortChange,
	resultsCount,
	totalCount,
}: FilterSearchProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const [isExpanded, setIsExpanded] = useState(false);

	const handleCategoryToggle = (category: string) => {
		const updatedCategories = selectedCategories.includes(category)
			? selectedCategories.filter((cat) => cat !== category)
			: [...selectedCategories, category];
		onCategoryChange(updatedCategories);
	};

	const clearAllCategories = () => {
		onCategoryChange([]);
	};

	if (isMobile) {
		return (
			<Paper
				elevation={2}
				sx={{
					p: 2,
					mb: 3,
					backgroundColor: 'grey.200',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						cursor: 'pointer',
					}}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<FilterList sx={{ mr: 1, color: 'primary.main' }} />
						<Typography variant="h6" sx={{ fontWeight: 600 }}>
							Filters
						</Typography>
						{selectedCategories.length > 0 && (
							<Chip
								label={selectedCategories.length}
								size="small"
								color="primary"
								sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
							/>
						)}
					</Box>
					<IconButton size="small">
						{isExpanded ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</Box>

				<Box sx={{ mt: 2 }}>
					<TextField
						fullWidth
						size="small"
						placeholder="Search products..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search color="primary" fontSize="small" />
								</InputAdornment>
							),
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								backgroundColor: 'background.paper',
								borderRadius: 2,
								'&:hover fieldset': {
									borderColor: 'primary.main',
								},
							},
						}}
					/>
				</Box>

				<Collapse in={isExpanded}>
					<Box sx={{ mt: 2 }}>
						<Box sx={{ mb: 2 }}>
							<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
								<Sort sx={{ mr: 0.5, fontSize: 16, verticalAlign: 'middle' }} />
								Sort By
							</Typography>
							<FormControl fullWidth size="small">
								<Select
									value={sortBy}
									onChange={(e) => onSortChange(e.target.value)}
									sx={{
										backgroundColor: 'background.paper',
										borderRadius: 2,
									}}
								>
									{SORT_OPTIONS.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>

						<Divider sx={{ my: 2 }} />

						<Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									mb: 1,
								}}
							>
								<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
									Categories
								</Typography>
								{selectedCategories.length > 0 && (
									<Chip
										label="Clear All"
										size="small"
										onClick={clearAllCategories}
										sx={{
											height: 20,
											fontSize: '0.7rem',
											cursor: 'pointer',
											'&:hover': {
												backgroundColor: 'primary.main',
												color: 'primary.contrastText',
											},
										}}
									/>
								)}
							</Box>

							<FormGroup row>
								{CATEGORIES.map((category) => (
									<FormControlLabel
										key={category}
										control={
											<Checkbox
												checked={selectedCategories.includes(category)}
												onChange={() => handleCategoryToggle(category)}
												size="small"
												sx={{
													color: 'primary.main',
													'&.Mui-checked': {
														color: 'primary.main',
													},
												}}
											/>
										}
										label={
											<Typography
												variant="body2"
												sx={{
													textTransform: 'capitalize',
													fontSize: '0.75rem',
												}}
											>
												{category}
											</Typography>
										}
										sx={{ mr: 1, ml: 0 }}
									/>
								))}
							</FormGroup>
						</Box>

						<Box sx={{ textAlign: 'center', mt: 2 }}>
							<Typography
								variant="body2"
								sx={{
									color: 'text.secondary',
									fontWeight: 500,
									fontSize: '0.75rem',
								}}
							>
								Showing {resultsCount} of {totalCount} products
							</Typography>
						</Box>
					</Box>
				</Collapse>
			</Paper>
		);
	}

	return (
		<Box
			sx={{
				position: 'sticky',
				top: 24,
				zIndex: 10,
				height: 'fit-content',
				overflowY: 'auto',
				width: '16rem',
			}}
		>
			<Paper
				elevation={2}
				sx={{
					p: 3,
					backgroundColor: 'grey.200',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
					<FilterList sx={{ mr: 1, color: 'primary.main' }} />
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Filters
					</Typography>
				</Box>

				{/* Search Bar */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
						Search
					</Typography>
					<TextField
						fullWidth
						size="small"
						placeholder="Search products..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search color="primary" fontSize="small" />
								</InputAdornment>
							),
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								backgroundColor: 'background.paper',
								borderRadius: 2,
								'&:hover fieldset': {
									borderColor: 'primary.main',
								},
							},
						}}
					/>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Box sx={{ mb: 3 }}>
					<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
						<Sort sx={{ mr: 0.5, fontSize: 16, verticalAlign: 'middle' }} />
						Sort By
					</Typography>
					<FormControl fullWidth size="small">
						<Select
							value={sortBy}
							onChange={(e) => onSortChange(e.target.value)}
							sx={{
								backgroundColor: 'background.paper',
								borderRadius: 2,
							}}
						>
							{SORT_OPTIONS.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Box sx={{ mb: 3 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 1,
						}}
					>
						<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
							Categories
						</Typography>
						{selectedCategories.length > 0 && (
							<Chip
								label="Clear All"
								size="small"
								onClick={clearAllCategories}
								sx={{
									height: 20,
									fontSize: '0.625rem',
									cursor: 'pointer',
									'&:hover': {
										backgroundColor: 'primary.main',
										color: 'primary.contrastText',
									},
								}}
							/>
						)}
					</Box>

					<FormGroup>
						{CATEGORIES.map((category) => (
							<FormControlLabel
								key={category}
								control={
									<Checkbox
										checked={selectedCategories.includes(category)}
										onChange={() => handleCategoryToggle(category)}
										size="small"
										sx={{
											color: 'primary.main',
											'&.Mui-checked': {
												color: 'primary.main',
											},
										}}
									/>
								}
								label={
									<Typography
										variant="body2"
										sx={{ textTransform: 'capitalize' }}
									>
										{category}
									</Typography>
								}
								sx={{ ml: 0 }}
							/>
						))}
					</FormGroup>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Box sx={{ textAlign: 'center' }}>
					<Typography
						variant="body2"
						sx={{
							color: 'text.secondary',
							fontWeight: 500,
							fontSize: '0.875rem',
						}}
					>
						Showing {resultsCount} of {totalCount} products
					</Typography>
				</Box>
			</Paper>
		</Box>
	);
};
