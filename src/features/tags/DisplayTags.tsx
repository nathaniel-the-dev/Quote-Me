import { useCallback } from 'react';
import { useQuote } from '../../providers/QuoteProvider';
import TagList from './TagList';

const DisplayTags = () => {
	const { tags, getRandomQuote } = useQuote();
	const handleClick = useCallback((slug: any) => getRandomQuote({ tag: slug }), []);

	if (!tags.length) return null;
	return (
		<div className="mt-8">
			<h4 className="mb-4">What do you need today?</h4>
			<TagList tags={tags} onClick={handleClick} />
		</div>
	);
};
export default DisplayTags;
