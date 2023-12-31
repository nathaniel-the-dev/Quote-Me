import React from 'react';

const Main = ({ children, className, ...props }: { children: React.ReactNode; className?: string; props?: any }) => {
	return (
		<main className={'min-h-dvh w-full pt-8 lg:pt-16' + (className || '')} {...props}>
			<div className="container">{children}</div>
		</main>
	);
};
export default Main;
