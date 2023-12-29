export default interface Quote {
	_id: string;

	text: string;
	author: {
		name: string;
		slug: string;
	};
	tags: string[];
}
