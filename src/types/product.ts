export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: number;
	soldCount: string;
}

export interface CartItem extends Product {
	quantity: number;
}
