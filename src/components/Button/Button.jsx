import React, { forwardRef } from 'react';
import cn from 'classnames';
import style from './Button.module.css';

const Button = forwardRef(({ children, disabled, theme, className }, ref) => {
	return (
		<button
			ref={ref}
			disabled={disabled}
			className={cn(style.Button, { [style[theme]]: true }, [className])}
		>
			{children}
		</button>
	);
});

export default Button;
