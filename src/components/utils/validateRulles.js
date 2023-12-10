export const validateRulles = {
	isRequired: (value) => {
		return Boolean(value.trim());
	},
	isEmail: (value) => {
		return Boolean(value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i));
	},
	min: (value, length) => {
		return value.length >= length;
	},
	matchPassword: (value, param, data) => {
		return value === data[param];
	},
};
