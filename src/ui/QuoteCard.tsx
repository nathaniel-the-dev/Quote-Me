const QuoteCard = ({ children }: any) => {
	return (
		<section>
			<blockquote className="card max-w-prose dark:bg-neutral dark:text-neutral-content w-full pt-6 mx-auto shadow-lg">
				{children}
			</blockquote>
		</section>
	);
};

QuoteCard.Body = ({ children, className }: any) => {
	return <div className={'card-body ' + (className || '')}>{children}</div>;
};

QuoteCard.Actions = ({ children, className }: any) => {
	return <div className={'card-actions ' + (className || '')}>{children}</div>;
};

export default QuoteCard;
