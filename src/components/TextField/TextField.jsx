import React, { useState } from 'react';
import style from './TextField.module.css';
import cn from 'classnames';
import { ReactComponent as Eye } from './icon/eye.svg';

const TextField = (props) => {
	const { name, value, onChange, placeholder, error, type } = props;

	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={style.TextField}>
			<label className={style.TextFieldLabel} htmlFor={name}>
				{name}
			</label>
			<div className={style.InputConteiner}>
				<input
					className={cn(style.Input, { [style.InputError]: error })}
					id={name}
					name={name}
					type={showPassword ? 'text' : type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{type === 'password' && (
					<Eye
						className={style.ButtonSvg}
						onClick={() => setShowPassword((prevState) => !prevState)}
					/>
				)}
			</div>
			{error && <span className={style.Error}>{error}</span>}
		</div>
	);
};

export default TextField;
