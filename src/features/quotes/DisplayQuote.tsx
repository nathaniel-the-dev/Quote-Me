import { animated } from '@react-spring/web';
import { useQuote } from '../../providers/QuoteProvider';
import GetQuote from './GetQuote';
import QuoteCard from '../../ui/QuoteCard';
import { useQuoteAnimation } from './useQuoteAnimation';
import Button from '../../ui/Button';
import { HiShare } from 'react-icons/hi2';
import ShareQuote from './ShareQuote';

const DisplayQuote = () => {
	const { quote, toggleShareModal } = useQuote();
	const { style } = useQuoteAnimation(quote);

	if (!quote) return null;

	return (
		<>
			<QuoteCard>
				<QuoteCard.Body className="items-center gap-8 overflow-hidden text-center">
					<animated.div style={style}>
						<h2 className="card-title text-pretty mb-4">&quot;{quote.text}&quot;</h2>
						<p className="grow-0 dark:text-gray-200">
							<span
								className="tooltip tooltip-bottom tooltip-secondary"
								data-tip={`Who is ${quote.author.name}?`}
							>
								<a
									className="link no-underline"
									href={`https://www.wikipedia.org/wiki/${quote.author.name}`}
									target="_blank"
								>
									{quote.author.name}
								</a>
							</span>
						</p>
					</animated.div>

					<QuoteCard.Actions className="items-center justify-center">
						<GetQuote />
						<Button icon={<HiShare />} className="btn-md btn-outline" onClick={toggleShareModal}>
							Share
						</Button>
					</QuoteCard.Actions>
				</QuoteCard.Body>
			</QuoteCard>

			<ShareQuote />
		</>
	);
};
export default DisplayQuote;
