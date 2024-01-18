import { useQuote } from '../../providers/QuoteProvider';
import Button from '../../ui/Button';
import { HiOutlineArrowPathRoundedSquare } from 'react-icons/hi2';

const Spinner = () => <span className="loading loading-spinner"></span>;

const GetQuote = () => {
	const { isLoading, getRandomQuote } = useQuote();

	return (
		<Button
			type="primary"
			className="btn-lg btn-circle"
			icon={!isLoading ? <HiOutlineArrowPathRoundedSquare /> : <Spinner />}
			disabled={isLoading}
			onClick={getRandomQuote}
		></Button>
	);
};
export default GetQuote;
