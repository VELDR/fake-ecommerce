import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product';

export function useCartActions() {
	const { isAuthenticated } = useAuthStore();
	const { addItem, updateQuantity, removeItem } = useCartStore();
	const router = useRouter();

	// Add item to cart only when user is authenticated
	const handleAddToCart = (product: Product) => {
		if (!isAuthenticated) {
			router.push('/login');
			return;
		}
		addItem(product);
	};

	const handleIncreaseQuantity = (
		productId: number,
		currentQuantity: number
	) => {
		updateQuantity(productId, currentQuantity + 1);
	};

	const handleDecreaseQuantity = (
		productId: number,
		currentQuantity: number
	) => {
		if (currentQuantity > 1) {
			updateQuantity(productId, currentQuantity - 1);
		} else {
			removeItem(productId);
		}
	};

	const handleRemoveItem = (productId: number) => {
		removeItem(productId);
	};

	return {
		handleAddToCart,
		handleIncreaseQuantity,
		handleDecreaseQuantity,
		handleRemoveItem,
	};
}
