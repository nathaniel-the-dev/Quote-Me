import { useSpring } from '@react-spring/web';
import { useLayoutEffect } from 'react';

export function useQuoteAnimation(dep: any) {
	const styleConfig = {
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 1000 },
	};

	const [style, api] = useSpring(() => styleConfig, []);
	useLayoutEffect(() => {
		api.start(styleConfig);
	}, [dep]);

	return {
		style,
		api,
	};
}
