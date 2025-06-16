import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

interface FormInputProps<T extends FieldValues>
	extends Omit<TextFieldProps, 'name'> {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
}

export function FormInput<T extends FieldValues>({
	name,
	control,
	label,
	...textFieldProps
}: FormInputProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					{...textFieldProps}
					label={label}
					error={!!error}
					helperText={error?.message}
					fullWidth
					variant="outlined"
				/>
			)}
		/>
	);
}
