type Toast = {
	id: number;
	title: string;
	message: string;
	timeoutInMs?: number;
};

export type PublicToast = Omit<Toast, 'id'>;

function createToastStore() {
	let toasts: Toast[] = $state([]);
	const toastTimeouts = new Map<number, NodeJS.Timeout>();

	function add(toast: PublicToast) {
		if (!toast.timeoutInMs) {
			toast.timeoutInMs = 5000;
		}
		const id = crypto.getRandomValues(new Uint32Array(1))[0];
		toasts.push({ ...toast, id });
		const timeoutId = setTimeout(() => remove(id), toast.timeoutInMs);
		toastTimeouts.set(id, timeoutId);
	}

	function remove(id: number) {
		toasts = toasts.filter((toast) => toast.id !== id);
		const timeoutId = toastTimeouts.get(id);
		if (timeoutId) {
			clearTimeout(timeoutId);
			toastTimeouts.delete(id);
		}
	}

	return {
		get toasts() {
			return toasts;
		},
		add,
		remove
	};
}

export const toastStore = createToastStore();

export function addToast(toast: PublicToast) {
	toastStore.add(toast);
}
