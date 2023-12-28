import React from 'react';

const Main = ({ children, className, ...props }: { children: React.ReactNode; className?: string; props?: any }) => {
	return (
		<main className={'min-h-dvh w-full text-center ' + className} {...props}>
			<div className="container py-24 lg:py-56">{children}</div>
		</main>
	);
};
export default Main;
