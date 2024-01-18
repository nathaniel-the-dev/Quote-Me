import React from 'react';

const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <h1 className={`text-6xl uppercase font-bold text-center ${className}`}>{children}</h1>;
};
export default Heading;
