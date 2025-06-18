import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { CartItem, Product } from '@/types/product';

interface CartStore {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;

	addItem: (product: Product, quantity?: number) => void;
	removeItem: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
	getItemQuantity: (productId: number) => number;

	showSuccessMessage: boolean;
	successMessage: string;
	setShowSuccessMessage: (show: boolean) => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		immer((set, get) => ({
			items: [],
			totalItems: 0,
			totalPrice: 0,
			showSuccessMessage: false,
			successMessage: '',

			addItem: (product) => {
				set((state) => {
					const existing = state.items.find((item) => item.id === product.id);
					if (existing) {
						existing.quantity += 1;
					} else {
						state.items.push({ ...product, quantity: 1 });
						state.showSuccessMessage = true;
						state.successMessage = `${product.title} added to cart`;
					}
					state.totalItems += 1;
					state.totalPrice += product.price;
				});
			},

			removeItem: (productId) => {
				set((state) => {
					const index = state.items.findIndex((item) => item.id === productId);
					if (index === -1) return;

					const item = state.items[index];
					state.totalItems -= item.quantity;
					state.totalPrice -= item.price * item.quantity;
					state.items.splice(index, 1);
				});
			},

			updateQuantity: (productId, quantity) => {
				set((state) => {
					const item = state.items.find((item) => item.id === productId);
					if (!item) return;

					const diff = quantity - item.quantity;
					item.quantity = quantity;
					state.totalItems += diff;
					state.totalPrice += item.price * diff;
				});
			},

			clearCart: () => {
				set((state) => {
					state.items = [];
					state.totalItems = 0;
					state.totalPrice = 0;
				});
			},

			getItemQuantity: (productId) => {
				const item = get().items.find((item) => item.id === productId);
				return item?.quantity || 0;
			},

			setShowSuccessMessage: (show) => {
				set((state) => {
					state.showSuccessMessage = show;
				});
			},
		})),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				items: state.items,
				totalItems: state.totalItems,
				totalPrice: state.totalPrice,
			}),
		}
	)
);
