import DisplayQuote from './features/quotes/DisplayQuote';
import RelatedQuotes from './features/quotes/RelatedQuotes';
import DisplayTags from './features/tags/DisplayTags';
import { QuoteProvider } from './providers/QuoteProvider';
import Heading from './ui/Heading';
import Main from './ui/Main';
import TabController from './ui/TabController';

export default function App() {
	return (
		<Main>
			<Heading>Quote Me!</Heading>

			<TabController>
				<TabController.Tab label="Quotes">
					<QuoteProvider>
						<DisplayQuote />
						<DisplayTags />

						<RelatedQuotes />
					</QuoteProvider>
				</TabController.Tab>

				<TabController.Tab targets="saved">
					<h1>Favorites</h1>
				</TabController.Tab>
			</TabController>
		</Main>
	);
}
