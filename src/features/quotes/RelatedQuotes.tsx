import { useQuote } from '../../providers/QuoteProvider';

const RelatedQuotes = () => {
	const { relatedQuotes, clearRelatedQuotes } = useQuote();

	const hasQuotes = relatedQuotes && relatedQuotes.length > 0;
	const author = relatedQuotes?.length ? relatedQuotes[0].author : null;

	return (
		<div className="drawer">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" checked={hasQuotes} readOnly />
			<div className="drawer-side">
				<label aria-label="close sidebar" className="drawer-overlay" onClick={clearRelatedQuotes}></label>
				<ul className="menu w-80 bg-base-200 text-base-content min-h-full p-4">
					<li className="menu-title mb-4">
						<h2 className="text-2xl">More Quotes by {author?.name}</h2>
					</li>

					{relatedQuotes.map((quote) => (
						<li className="active" key={quote._id}>
							<a>{quote.text}</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default RelatedQuotes;
