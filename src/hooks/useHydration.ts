import { useEffect, useState } from 'react';

/**
 * Custom hook to check if we're client-side after hydration
 * Prevents SSR mismatch errors for dynamic content
 */
export const useHydration = () => {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	return hydrated;
};
