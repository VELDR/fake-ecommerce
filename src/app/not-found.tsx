import Link from 'next/link';

import { Box, Button, Container, Typography } from '@mui/material';

import { Navbar } from '@/components/ui/Navbar';

export default function NotFound() {
	return (
		<>
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<Container
					maxWidth="lg"
					sx={{
						flexGrow: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						py: 4,
					}}
				>
					<Box sx={{ textAlign: 'center', maxWidth: 600 }}>
						<Typography
							variant="h1"
							component="h1"
							sx={{
								fontSize: { xs: '4rem', md: '6rem' },
								fontWeight: 700,
								color: 'primary.main',
								mb: 2,
							}}
						>
							404
						</Typography>

						<Typography
							variant="h4"
							component="h2"
							sx={{
								fontWeight: 600,
								mb: 2,
								color: 'text.primary',
							}}
						>
							Page Not Found
						</Typography>

						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ mb: 4, lineHeight: 1.6 }}
						>
							The page you&apos;re looking for doesn&apos;t exist. Just like our
							products. 🤣
						</Typography>

						<Box
							sx={{
								display: 'flex',
								gap: 2,
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}
						>
							<Button
								component={Link}
								href="/"
								variant="contained"
								size="large"
								sx={{ px: 4 }}
							>
								Go Home
							</Button>

							<Button
								component={Link}
								href="/cart"
								variant="outlined"
								size="large"
								sx={{ px: 4 }}
							>
								View Cart
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	);
}
