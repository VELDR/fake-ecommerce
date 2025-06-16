export const capitalizeFirstLetter = (str: string) => {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const formatFullName = (firstName: string, lastName: string): string => {
	const first = capitalizeFirstLetter(firstName);
	const last = capitalizeFirstLetter(lastName);
	return `${first} ${last}`;
};

export const getFullNameInitials = (
	firstName: string,
	lastName: string
): string => {
	const firstInitial = firstName.charAt(0).toUpperCase();
	const lastInitial = lastName.charAt(0).toUpperCase();
	return `${firstInitial}${lastInitial}`;
};
