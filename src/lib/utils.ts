export function shuffle<T>(arr: T[]) {
	let len = arr.length;

	while (len--) {
		const randIndx = Math.floor(Math.random() * len + 1);
		const temp = arr[len];
		arr[len] = arr[randIndx];
		arr[randIndx] = temp;
	}
	return arr;
}

export function getEmojiUrl(emoji: string) {
	const code = [...emoji].map((ch) => ch.codePointAt(0)?.toString(16)).join('-'); // convert to hexa representation for char code
	return `/svg/${code}.svg`;
}
