import React, { forwardRef } from 'react';
import cn from 'classnames';
import style from './Button.module.css';

const Button = forwardRef(({ children, disabled, theme, className }, ref) => {
	console.log(ref);
	return (
		<button
			ref={ref}
			disabled={disabled}
			className={cn(style.Button, { [style[theme]]: true }, [className])}
			onClick={() => console.log()}
		>
			{children}
		</button>
	);
});

export default Button;
