import { api } from '@/helpers/apiHelpers';
import type { Product } from '@/types/product';
import { generateRandomRating, generateRandomSoldCount } from '@/utils/product';

export const productAPI = {
	getAllProducts: async (): Promise<Product[]> => {
		const { data } = await api.get('/products');

		const products = data.map((product: Product) => ({
			...product,
			rating: generateRandomRating(product.id),
			soldCount: generateRandomSoldCount(product.id),
		}));

		return products;
	},
};
