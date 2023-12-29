import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getQuotes as getQuotesApi, getRandomQuote as getRandomQuoteApi, getTags } from '../services/quotes';
import Quote from '../types/quote';
import Tag from '../types/tag';
import { getRandomValue } from '../utils/helpers';

type QuoteContextType = {
	isLoading: boolean;
	quote: Quote | null;
	relatedQuotes: Quote[];
	tags: Tag[];
	getQuotes: (options?: { author?: string }) => void;
	getRandomQuote: (options?: { tag?: string }) => void;
	clearRelatedQuotes: () => void;
};

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }): ReactNode {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [quote, setQuote] = useState<Quote | null>(null);
	const [relatedQuotes, setRelatedQuotes] = useState<Quote[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);

	async function getQuotes(opts: { author?: string } = {}) {
		try {
			const data = await getQuotesApi(opts);
			setRelatedQuotes(data);
		} catch {
			// do nothing
		}
	}

	async function getRandomQuote(opts: { tag?: string } = {}) {
		try {
			setIsLoading(true);
			const data = await getRandomQuoteApi(opts);
			setQuote(data);
		} finally {
			setIsLoading(false);
		}
	}

	async function getRandomTags() {
		const tags = await getTags();
		const randomTags = Array.from({ length: 3 }, () => getRandomValue(tags));
		setTags(randomTags);
	}

	function clearRelatedQuotes() {
		setRelatedQuotes([]);
	}

	useEffect(() => {
		getRandomQuote();
		getRandomTags();
	}, []);

	const value = useMemo<QuoteContextType>(
		() => ({
			isLoading,
			quote,
			relatedQuotes,
			tags,
			getQuotes,
			getRandomQuote,
			clearRelatedQuotes,
		}),
		[isLoading, quote, tags, relatedQuotes]
	);

	return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
	const ctx = useContext(QuoteContext);

	if (!ctx) {
		throw new Error('useQuote must be used within a QuoteProvider');
	}
	return ctx;
}
