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
				massage: 'Email is required',
			},
			isEmail: {
				massage: 'Email is invalid',
			},
		},
		name: {
			isRequired: {
				massage: 'Name is required',
			},
		},
		password: {
			isRequired: {
				massage: 'Password is required',
			},
			min: {
				massage: 'Password must be large then 6 sembol',
				param: 6,
			},
		},
		cheackPassword: {
			matchPassword: {
				massage: "Password dont't match",
				param: 'password',
			},
		},
	};

	const handleSubmit = (event) => {
		event.preventDefault();
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
			<h1 className={style.Title}>Title</h1>
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

				<Button
					onClick={() => console.log(value)}
					theme="primary"
					disabled={!isValid}
					ref={buttonRef}
				>
					Submit
				</Button>
				<button onClick={() => console.log(value)}>Reg</button>
			</form>
		</div>
	);
};
