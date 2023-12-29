import { useQuote } from '../../providers/QuoteProvider';
import Button from '../../ui/Button';
import { HiSun } from 'react-icons/hi2';

const Spinner = () => <span className="loading loading-spinner"></span>;

const GetQuote = () => {
	const { isLoading, getRandomQuote } = useQuote();

	return (
		<Button
			type="primary"
			className="btn-md"
			icon={!isLoading ? <HiSun /> : <Spinner />}
			disabled={isLoading}
			onClick={getRandomQuote}
		>
			{!isLoading ? 'Inspire Me' : 'Getting Quote...'}
		</Button>
	);
};
export default GetQuote;
