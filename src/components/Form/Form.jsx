import { useEffect, useState, useRef } from 'react';
import style from './Form.module.css';
import TextField from '../TextField/TextField';
import { validate } from '../utils/validate';
import Button from '../Button/Button';

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

	const buttonRef = useRef(null);

	const isValid = Object.keys(error).length === 0;

	const validateSchema = {
		email: {
			isRequired: {
				massage: 'Email - поле обязательно для ввода',
			},
			isEmail: {
				massage: 'Email - неверный ',
			},
		},
		name: {
			isRequired: {
				massage: 'Name - поле обязательно для ввода',
			},
		},
		password: {
			isRequired: {
				massage: 'Password - поле обязательно для ввода',
			},
			min: {
				massage: 'Password - должен иметь не менее 6 символов',
				param: 6,
			},
		},
		cheackPassword: {
			isRequired: {
				massage: 'cheackPassword - поле обязательно для ввода',
			},
			matchPassword: {
				massage: 'Пароли не совпадают ',
				param: 'password',
			},
		},
	};

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
		const error = validate(value, validateSchema);
		setError(error);
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
