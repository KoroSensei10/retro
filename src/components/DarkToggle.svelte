<script lang="ts">
	import { fade } from 'svelte/transition';
	import { MoonStar, Sun } from 'lucide-svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { onMount } from 'svelte';
	import OldButton from './OldButton.svelte';

	let dark = $state(true);

	const toggleDark = () => {
		dark = !dark;
		localStorage.theme = dark ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', dark);
	};

	onMount(() => {
		// dark =
		// 	localStorage.theme === 'dark' ||
		// 	(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		dark = true;
		document.documentElement.classList.toggle('dark', dark);
	});

	type NBRTLSM_DarkToggleProps = {
		title?: never;
		class?: string;
	} & HTMLButtonAttributes;

	let { class: className, ...rest }: NBRTLSM_DarkToggleProps = $props();
</script>

<OldButton title="" onclick={toggleDark} type="button" class={className} {...rest}>
	{#key dark}
		<div in:fade={{ duration: 200 }} class="flex w-full justify-center">
			{#if dark}
				<MoonStar stroke="2.5" color="blue" />
			{:else}
				<Sun stroke="2.5" color="yellow" />
			{/if}
		</div>
	{/key}
</OldButton>
