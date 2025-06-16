import { Container } from '@mui/material';

import { Navbar } from '@/components/ui/Navbar';

export default function Home() {
	return (
		<>
			<Navbar />
			<Container maxWidth="lg">Hello</Container>
		</>
	);
}
