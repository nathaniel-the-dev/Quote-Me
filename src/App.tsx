import DisplayQuote from './features/quotes/DisplayQuote';
import GetQuote from './features/quotes/GetQuote';
import TagList from './features/tags/TagList';
import { QuoteProvider } from './providers/QuoteProvider';
import Heading from './ui/Heading';
import Main from './ui/Main';

export default function App() {
	return (
		<Main>
			<Heading>Quote Me!</Heading>

			<QuoteProvider>
				<DisplayQuote />
				<GetQuote />

				<TagList />
			</QuoteProvider>
		</Main>
	);
}
