import { useSpring, animated } from '@react-spring/web';
import { useQuote } from '../../providers/QuoteProvider';

const DisplayQuote = () => {
	const { quote } = useQuote();
	const [spring] = useSpring(
		() => ({
			from: { opacity: 0, scale: 0 },
			to: { opacity: 1, scale: 1 },
			config: { duration: 1000, easing: [0.5, 0, 0.5, 1] },
		}),
		[quote]
	);

	if (!quote) return null;

	return (
		<section className="py-20">
			<animated.blockquote
				className="card max-w-prose w-full mx-auto bg-neutral text-neutral-content"
				style={spring}
			>
				<div className="card-body items-center text-center">
					<h2 className="card-title text-pretty mb-4">&quot;{quote.text}&quot;</h2>
					<p className="text-gray-300">{quote.author.name}</p>
				</div>
			</animated.blockquote>
		</section>
	);
};
export default DisplayQuote;
