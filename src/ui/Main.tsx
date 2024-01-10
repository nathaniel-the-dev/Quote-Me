import React from 'react';

const Main = ({ children, className, ...props }: { children: React.ReactNode; className?: string; props?: any }) => {
	return (
		<main
			className={
				'min-h-dvh flex flex-col w-full pt-8 lg:pt-16 bg-cover bg-center bg-no-repeat bg-[url("/images/primary-bg.svg")] ' +
				(className || '')
			}
			{...props}
		>
			<div className="container bg-white py-20 my-auto">{children}</div>
		</main>
	);
};
export default Main;
