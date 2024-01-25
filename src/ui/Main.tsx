import React from 'react';

const Main = ({ children, className, ...props }: { children: React.ReactNode; className?: string; props?: any }) => {
	return (
		<main
			className={
				'min-h-dvh flex flex-col w-full bg-cover bg-center bg-no-repeat bg-[url("/images/primary-bg.svg")] ' +
				(className || '')
			}
			{...props}
		>
			<div className="dark:bg-neutral-800 container py-20 my-auto bg-white rounded-lg">{children}</div>
		</main>
	);
};
export default Main;
