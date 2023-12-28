import { useQuote } from '../../providers/QuoteProvider';
import TagItem from './TagItem';

const TagList = () => {
	const { tags, getQuotesByTag } = useQuote();

	return (
		<div className="p-4">
			<h4 className="mb-2">What do you need today?</h4>

			<ul className="flex items-center w-fit mx-auto gap-4">
				{tags.map((tag, i) => (
					<TagItem
						key={tag._id}
						position={i}
						name={'#' + tag.slug}
						onClick={() => getQuotesByTag(tag.slug)}
					/>
				))}
			</ul>
		</div>
	);
};
export default TagList;
