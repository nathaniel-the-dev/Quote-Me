export function getRandomValue(values: any[]) {
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex];
}

export function copyToClipBoard(text: string) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
	}
}

export function loadImage(src: string, options: any = {}): Promise<HTMLImageElement> {
	const image = new window.Image(options?.width, options?.height);
	image.src = src;
	image.crossOrigin = options.crossOrigin || 'anonymous';

	return new Promise((resolve, reject) => {
		image.onerror = reject;
		image.onload = () => resolve(image);
	});
}
