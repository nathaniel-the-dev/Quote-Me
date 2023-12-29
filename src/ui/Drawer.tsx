import { createContext, useContext, useState } from 'react';

const DrawerContext = createContext<any>(null);

const Drawer = ({ children }: any) => {
	const [open, setOpen] = useState(false);

	function toggle() {
		setOpen((prev) => !prev);
	}

	return (
		<DrawerContext.Provider value={{ open, toggle }}>
			<div className="drawer">
				<input id="sidebar" type="checkbox" className="drawer-toggle" checked={open} />
				{children}
			</div>
		</DrawerContext.Provider>
	);
};

Drawer.Toggle = ({ children, className }: any) => {
	const { toggle } = useContext(DrawerContext);

	return (
		<label className={'drawer-button ' + (className || '')} onClick={toggle}>
			{children}
		</label>
	);
};

Drawer.Content = ({ children }: any) => {
	return <div className="drawer-content">{children}</div>;
};

Drawer.Sidebar = ({ children }: any) => {
	const { toggle } = useContext(DrawerContext);

	return (
		<div className="drawer-side">
			<label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay" onClick={toggle}></label>
			{children}
		</div>
	);
};

export default Drawer;
