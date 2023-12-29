import { createContext, useContext, useState } from 'react';

const TabControllerContext = createContext<any>(null);

const TabController = ({ children }: any) => {
	const [activeTab, setActiveTab] = useState('quotes');

	return (
		<TabControllerContext.Provider value={{ activeTab, switchTab: setActiveTab }}>
			<div className="tabs tabs-boxed" role="tablist">
				{children}
			</div>
		</TabControllerContext.Provider>
	);
};

TabController.Tab = ({ label, children }: any) => {
	return (
		<>
			<input type="radio" name="tabs" role="tab" className="tab" aria-label={label} />
			<div className="tab-content" role="tabpanel">
				{children}
			</div>
		</>
	);
};

export default TabController;
