import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { ErrorBoundary } from 'react-error-boundary';
import Error from './ui/Error.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary fallback={<Error />}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
