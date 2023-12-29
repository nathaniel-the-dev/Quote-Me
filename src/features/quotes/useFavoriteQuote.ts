import { useEffect, useMemo, useState } from 'react';
import { useStorage } from '../../hooks/useStorage';
import Quote from '../../types/quote';

export function useFavoriteQuote(currentQuote: Quote | null) {
	const { getItem, setItem } = useStorage();
	const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);

	const isFavorited = useMemo(() => {
		if (!currentQuote) return false;
		return savedQuotes.some((q) => q._id === currentQuote._id);
	}, [currentQuote, savedQuotes]);

	function toggleFavorite() {
		if (!currentQuote) return;

		setSavedQuotes((savedQuotes) =>
			!isFavorited ? [...savedQuotes, currentQuote] : savedQuotes.filter((q) => q._id !== currentQuote._id)
		);
	}
	useEffect(() => {
		(async () => {
			const quotes = ((await getItem('quotes')) || []) as Quote[];
			setSavedQuotes(quotes);
		})();
	}, []);

	useEffect(() => {
		setItem('quotes', savedQuotes);
	}, [savedQuotes]);

	return { savedQuotes, isFavorited, toggleFavorite };
}
