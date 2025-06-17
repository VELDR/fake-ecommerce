import { useQuery } from '@tanstack/react-query';

import { productAPI } from '@/services/product/productService';

export const useProducts = () => {
	const { data, isLoading, error } = useQuery({
		queryFn: () => productAPI.getAllProducts(),
		queryKey: ['products'],
	});

	return { data, isLoading, error };
};
