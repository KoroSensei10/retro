function createHeadingsStore() {
	let headings: string[] = $state([]);

	return {
		get headings() {
			return headings;
		},
		set headings(value: string[]) {
			headings = value;
		}
	};
}

export const headingsStore = createHeadingsStore();
