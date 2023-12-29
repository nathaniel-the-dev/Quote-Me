import { HiArrowPathRoundedSquare } from 'react-icons/hi2';
import Button from './Button';

const Error = () => {
	function reload() {
		window.location.reload();
	}
	return (
		<div className="place-items-center min-h-dvh container grid">
			<div className="card max-w-prose shadow-lg">
				<div className="card-body space-y-4 text-center">
					<h1 className="text-4xl">Something went wrong!</h1>
					<p className="text-pretty dark:text-gray-300">
						We encountered an unexpected issue. Please check your connection and try refreshing the page. If
						the problem persists, contact support.
					</p>
					<Button type="danger" icon={<HiArrowPathRoundedSquare />} onClick={reload}>
						Reload
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Error;
