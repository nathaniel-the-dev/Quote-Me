import React from 'react';

type Props = {
	children?: React.ReactNode;
	type?: string;
	icon?: React.ReactNode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	role?: string;
};

const Button = ({ type = 'primary', className, icon, disabled, onClick, children, role }: Props) => {
	return (
		<button
			className={`btn btn-${type}${className ? ` ${className}` : ''} ${icon && !children ? 'btn-circle' : ''}`}
			onClick={onClick ? onClick : () => null}
			disabled={disabled}
			role={role}
		>
			{icon && <span className="text-[1.25em]">{icon}</span>}
			{children}
		</button>
	);
};
export default Button;
