<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type OldButtonProps = {
		children?: Snippet;
		title?: string;
		class?: string;
	} & HTMLButtonAttributes;
	let { children, title, class: className, ...rest }: OldButtonProps = $props();
</script>

<button
	class="border-2 border-black border-l-gray-100 border-t-gray-100 bg-[#009900] font-bold text-gray-100 shadow-md hover:outline-dotted hover:outline-offset-1 hover:outline-blue-500 focus:border-gray-100 focus:border-l-black focus:border-t-black hover:focus:outline-none {className}"
	{...rest}
>
	{title}
	{#if children}
		{@render children()}
	{/if}
</button>
