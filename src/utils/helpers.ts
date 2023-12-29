export function getRandomValue(values: any[]) {
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex];
}

export function copyToClipBoard(text: string) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
	}
}
