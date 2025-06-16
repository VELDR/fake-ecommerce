import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

import { SuccessSnackbar } from '@/components/ui/SuccessSnackbar';
import { Providers } from '@/providers';

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'UnrealStuff - Shop Here!',
	description: 'UnrealStuff literally sells unreal stuff. They are not real!!!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable}`}>
				<Providers>
					{children}
					<SuccessSnackbar />
				</Providers>
			</body>
		</html>
	);
}
