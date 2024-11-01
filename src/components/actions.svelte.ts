import type { Action } from 'svelte/action';

type ClickOutsideData = {
	fn: () => void;
};

export const click_outside: Action<HTMLElement, ClickOutsideData> = (
	node,
	data: ClickOutsideData
) => {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node)) {
			data.fn();
		}
	};

	document.addEventListener('click', handleClick);
	$effect(() => {
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

export const focusElement: Action<HTMLElement> = (node) => {
	node.focus();
};
