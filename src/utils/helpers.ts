export function getRandomValue(values: any[]) {
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex];
}
