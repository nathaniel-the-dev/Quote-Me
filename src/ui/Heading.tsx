import React from 'react';

const Heading = ({ children }: { children: React.ReactNode }) => {
	return <h1 className="text-5xl font-bold mb-8">{children}</h1>;
};
export default Heading;
