import React from 'react';

type Props = {
	type?: string;
	icon?: React.ReactNode;
	className?: string;
	onClick: () => void;
	children: React.ReactNode;
	disabled?: boolean;
};

const Button = ({ type = 'primary', className, icon, disabled, onClick, children }: Props) => {
	return (
		<button className={`btn btn-${type}${className ? ` ${className}` : ''}`} onClick={onClick} disabled={disabled}>
			<span className="text-2xl">{icon}</span>
			{children}
		</button>
	);
};
export default Button;
