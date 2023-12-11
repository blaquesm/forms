import { validateRulles } from './validateRulles';

export const validate = (values, config) => {
	const error = {};

	for (const key in config) {
		const validateRules = config[key];

		for (const rule in validateRules) {
			const { massage, param } = validateRules[rule];

			const validator = validateRulles[rule];
			const isError = validator && !validator(values[key], param, values);

			if (isError) {
				error[key] = massage;
				break;
			}
		}
	}

	return error;
};
