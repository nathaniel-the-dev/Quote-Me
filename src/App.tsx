import DisplayQuote from './features/quotes/DisplayQuote';
import DisplayTags from './features/tags/DisplayTags';
import { QuoteProvider } from './providers/QuoteProvider';
import Heading from './ui/Heading';
import Main from './ui/Main';

export default function App() {
	return (
		<Main>
			<Heading>Quote Me!</Heading>

			<QuoteProvider>
				<DisplayQuote />
				<DisplayTags />
			</QuoteProvider>
		</Main>
	);
}
