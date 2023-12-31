import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getQuoteById, getRandomQuote as getRandomQuoteApi, getTags } from '../services/quotes';
import Quote from '../types/quote';
import Tag from '../types/tag';
import { getRandomValue } from '../utils/helpers';

type QuoteContextType = {
	isLoading: boolean;
	quote: Quote | null;
	tags: Tag[];
	getRandomQuote: (options?: { tag?: string }) => void;

	openShareModal: boolean;
	toggleShareModal: () => void;
};

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }): ReactNode {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [quote, setQuote] = useState<Quote | null>(null);
	const [tags, setTags] = useState<Tag[]>([]);
	const [openShareModal, setOpenShareModal] = useState<boolean>(false);

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

	async function getQuoteFromUrl(quoteId: string) {
		const data = await getQuoteById(quoteId);
		setQuote(data);
	}

	function toggleShareModal() {
		setOpenShareModal((mode) => !mode);
	}

	useEffect(() => {
		const url = new URLSearchParams(window.location.search);
		const quoteId = url.get('id');

		if (quoteId) getQuoteFromUrl(quoteId);
		else getRandomQuote();

		getRandomTags();
	}, []);

	const value = useMemo<QuoteContextType>(
		() => ({
			isLoading,
			quote,
			getRandomQuote,

			tags,

			openShareModal,
			toggleShareModal,
		}),
		[isLoading, quote, tags, openShareModal]
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
