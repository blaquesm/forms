import { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import style from './Form.module.css';
import TextField from '../TextField/TextField';
import { validate } from '../utils/validate';
import Button from '../Button/Button';
import { parseYupError } from '../utils/parsYupError';

export const Form = () => {
	const [value, setValue] = useState({
		email: '',
		name: '',
		password: '',
		cheackPassword: '',
	});
	const [error, setError] = useState({});

	const handleChange = (event) => {
		const { target } = event;
		setValue((prevState) => ({ ...prevState, [target.name]: target.value }));
	};

	const validateSchema = yup.object().shape({
		email: yup
			.string()
			.required('Поле email обязательно к заполнеению')
			.email('email введен некоректно'),
		name: yup.string().required('Поле name обязательно к заполнеению'),
		password: yup
			.string()
			.required('Поле password обязательно к заполнеению')
			.min(6, 'Поле password должен быть не менее 6 символов'),
		cheackPassword: yup
			.string()
			.required('Поле cheackPassword обязательно к заполнеению')
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
	});

	const buttonRef = useRef(null);
	const isValid = Object.keys(error).length === 0;

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(value);
	};

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	useEffect(() => {
		validateSchema
			.validate(value, { abortEarly: false })
			.then(() => {
				setError({});
			})
			.catch((yupError) => {
				const error = parseYupError(yupError);
				setError(error);
			});
	}, [value]);

	return (
		<div className={style.FormPage}>
			<form onSubmit={handleSubmit}>
				<TextField
					name="name"
					type="text"
					placeholder="name"
					id="name"
					value={value.name}
					onChange={handleChange}
					error={error.name}
				/>
				<TextField
					name="email"
					type="email"
					placeholder="email"
					id="email"
					value={value.email}
					onChange={handleChange}
					error={error.email}
				/>
				<TextField
					name="password"
					type="password"
					placeholder="password"
					id="password"
					value={value.password}
					onChange={handleChange}
					error={error.password}
				/>
				<TextField
					name="cheackPassword"
					type="password"
					placeholder="Повтори пароль"
					id="cheackPassword"
					value={value.cheackPassword}
					onChange={handleChange}
					error={error.cheackPassword}
				/>

				<Button theme="primary" disabled={!isValid} ref={buttonRef}>
					Зарегистрироваться
				</Button>
			</form>
		</div>
	);
};
