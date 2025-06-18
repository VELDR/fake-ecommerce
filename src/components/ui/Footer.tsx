import { Facebook, GitHub, Instagram, Twitter } from '@mui/icons-material';
import {
	Box,
	Container,
	Divider,
	Link,
	Stack,
	Typography,
} from '@mui/material';

export const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: 'background.paper',
				borderTop: '1px solid',
				borderColor: 'divider',
				mt: 'auto',
				py: 4,
			}}
		>
			<Container maxWidth="lg">
				<Stack spacing={4}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(2, 1fr)',
								md: 'repeat(4, 1fr)',
							},
							gap: 4,
						}}
					>
						<Stack spacing={2}>
							<Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
								UnrealStuff
							</Typography>
							<Typography variant="body2" color="text.secondary">
								We literally sells unreal stuff. They are not real!!!
							</Typography>
						</Stack>

						<Stack spacing={2}>
							<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
								Quick Links
							</Typography>
							<Stack spacing={1}>
								<Link href="/" color="text.secondary" underline="hover">
									Home
								</Link>
								<Link href="/cart" color="text.secondary" underline="hover">
									Cart
								</Link>
								<Link href="/login" color="text.secondary" underline="hover">
									Login
								</Link>
							</Stack>
						</Stack>

						<Stack spacing={2}>
							<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
								Customer Service
							</Typography>
							<Stack spacing={1}>
								<Link href="#" color="text.secondary" underline="hover">
									Contact Us
								</Link>
								<Link href="#" color="text.secondary" underline="hover">
									FAQ
								</Link>
								<Link href="#" color="text.secondary" underline="hover">
									Return Policy
								</Link>
								<Link href="#" color="text.secondary" underline="hover">
									Privacy Policy
								</Link>
							</Stack>
						</Stack>

						<Stack spacing={2}>
							<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
								Follow Us
							</Typography>
							<Stack direction="row" spacing={1}>
								<Link href="#" color="text.secondary">
									<Facebook />
								</Link>
								<Link href="#" color="text.secondary">
									<Twitter />
								</Link>
								<Link href="#" color="text.secondary">
									<Instagram />
								</Link>
								<Link href="#" color="text.secondary">
									<GitHub />
								</Link>
							</Stack>
						</Stack>
					</Box>

					<Divider />

					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', sm: 'row' },
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Typography variant="body2" color="text.secondary">
							© 2025 UnrealStuff. All rights reserved. 😉
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Made with ❤️ for people who get the joke
						</Typography>
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};
