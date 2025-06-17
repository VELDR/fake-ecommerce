// Random rating between 3.0 and 5.0
export const generateRandomRating = (_productId?: number) => {
	const rating = Math.round((Math.random() * 2 + 3) * 10) / 10;
	return rating;
};

// Random sold count between 50 and 10000
export const generateRandomSoldCount = (_productId?: number) => {
	const count = Math.floor(Math.random() * 10000) + 50;
	const soldCount =
		count >= 1000 ? `${Math.floor(count / 100) / 10}k+ sold` : `${count} sold`;
	return soldCount;
};
