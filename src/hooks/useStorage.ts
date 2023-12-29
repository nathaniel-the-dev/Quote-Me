import localforage from 'localforage';

export function useStorage() {
	return {
		getItem: (key: string) => localforage.getItem(key),
		setItem: (key: string, value: any) => localforage.setItem(key, value),
		removeItem: (key: string) => localforage.removeItem(key),
	};
}
