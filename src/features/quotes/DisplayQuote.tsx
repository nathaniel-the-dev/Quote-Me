import { animated } from '@react-spring/web';
import { useQuote } from '../../providers/QuoteProvider';
import GetQuote from './GetQuote';
import QuoteCard from '../../ui/QuoteCard';
import { useQuoteAnimation } from './useQuoteAnimation';
import Button from '../../ui/Button';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';
import { useFavoriteQuote } from './useFavoriteQuote';

const DisplayQuote = () => {
	const { quote, getQuotes } = useQuote();
	const { isFavorited, toggleFavorite } = useFavoriteQuote(quote);
	const { style } = useQuoteAnimation(quote);

	if (!quote) return null;

	const getQuotesByAuthor = () => {
		getQuotes({ author: quote.author.slug });
	};

	return (
		<QuoteCard>
			<QuoteCard.Body className="items-center gap-8 overflow-hidden text-center">
				<animated.div style={style}>
					<h2 className="card-title text-pretty mb-4">&quot;{quote.text}&quot;</h2>
					<p className="grow-0 dark:text-gray-300">
						<span
							className="tooltip tooltip-bottom tooltip-secondary"
							data-tip={`More from ${quote.author.name}`}
						>
							<a className="link no-underline" onClick={getQuotesByAuthor}>
								{quote.author.name}
							</a>
						</span>
					</p>
				</animated.div>

				<QuoteCard.Actions className="items-center justify-center">
					<GetQuote />

					<Button
						className="btn-md btn-outline"
						icon={!isFavorited ? <HiOutlineStar /> : <HiStar />}
						onClick={toggleFavorite}
					>
						Save{isFavorited ? 'd' : ''}
					</Button>
				</QuoteCard.Actions>
			</QuoteCard.Body>
		</QuoteCard>
	);
};
export default DisplayQuote;
