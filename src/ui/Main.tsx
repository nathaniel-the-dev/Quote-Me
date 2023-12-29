import React from 'react';

const Main = ({ children, className, ...props }: { children: React.ReactNode; className?: string; props?: any }) => {
	return (
		<main
			className={'min-h-dvh w-full text-center flex items-center justify-center' + (className || '')}
			{...props}
		>
			<div className="container">{children}</div>
		</main>
	);
};
export default Main;
