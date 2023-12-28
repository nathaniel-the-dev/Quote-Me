import Quote from '../types/quote';
import { API_URL } from '../utils/constants';

export async function getRandomQuote(opts?: { author?: string; tag?: string }): Promise<Quote | null> {
	try {
		const params = new URLSearchParams();
		if (opts?.author) params.append('author', opts.author);
		if (opts?.tag) params.append('tags', opts.tag);

		const urlWithParams = `${API_URL}/quotes/random${params.toString() ? `?${params.toString()}` : ''}`;

		const response = await fetch(urlWithParams);
		const data = await response.json();

		if (!data?.length) return null;

		return {
			_id: data[0]._id,
			text: data[0].content,
			author: {
				name: data[0].author,
				slug: data[0].authorSlug,
			},
			tags: data[0].tags,
			dateAdded: new Date(data[0].dateAdded),
		};
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch random quote');
	}
}

export async function getTags() {
	try {
		const response = await fetch(`${API_URL}/tags`);
		const data = await response.json();

		const tags = data.map((tag: any) => ({ _id: tag._id, name: tag.name, slug: tag.slug }));
		return tags;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch tags');
	}
}
