import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { getRandomQuote as getRandomQuoteApi, getTags } from '../services/quotes';
import Quote from '../types/quote';
import Tag from '../types/tag';
import { getRandomValue } from '../utils/helpers';

type QuoteContextType = {
	isLoading: boolean;
	quote: Quote | null;
	tags: Tag[];
	getRandomQuote: () => void;
	getQuotesByTag: (tag: string) => void;
};

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }): ReactNode {
	const [quote, setQuote] = useState<Quote | null>(null);
	const [tags, setTags] = useState<Tag[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const selectedTag = useRef<string>('');

	async function getRandomQuote() {
		try {
			setIsLoading(true);
			const data = await getRandomQuoteApi({ tag: selectedTag.current });
			setQuote(data);
		} finally {
			setIsLoading(false);
			selectedTag.current = '';
		}
	}

	function getQuotesByTag(tag: string) {
		selectedTag.current = tag;
		getRandomQuote();
	}

	useEffect(() => {
		(async function () {
			const tags = await getTags();
			const randomTags = Array.from({ length: 3 }, () => getRandomValue(tags));
			setTags(randomTags);
		})();
	}, []);

	return (
		<QuoteContext.Provider
			value={{
				isLoading,
				quote,
				tags,
				getRandomQuote,
				getQuotesByTag: getQuotesByTag,
			}}
		>
			{children}
		</QuoteContext.Provider>
	);
}

export function useQuote() {
	const ctx = useContext(QuoteContext);

	if (!ctx) {
		throw new Error('useQuote must be used within a QuoteProvider');
	}
	return ctx;
}
