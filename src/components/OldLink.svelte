<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	type OldLinkProps = {
		children: Snippet;
		class?: string;
	} & HTMLBaseAttributes;

	const { children, class: className, ...rest }: OldLinkProps = $props();
</script>

<a class="text-blue-500 underline visited:text-purple-500 {className}" {...rest}>
	{#if children}
		{@render children()}
	{/if}
</a>
