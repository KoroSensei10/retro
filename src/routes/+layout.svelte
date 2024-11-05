<script lang="ts">
	import '../app.css';
	import { fly } from 'svelte/transition';
	import { Lock, LockOpen } from 'lucide-svelte';
	import DarkToggle from '../components/DarkToggle.svelte';
	import OldButton from '../components/OldButton.svelte';
	import { headingsStore } from '../stores/headings/index.svelte';
	import pierre from '../lib/assets/pierre_magique.png';
	import { userStore } from '../stores/auth/index.svelte';
	import Headings from '../components/Headings.svelte';
	import PageSearch from '../components/PageSearch.svelte';
	import type { SvelteComponent } from 'svelte';
	import Toaster from '../components/Toaster.svelte';

	let { children } = $props();

	let pageSearch: SvelteComponent | undefined = $state(undefined);
</script>

<Toaster></Toaster>

<div
	class="relative grid h-svh grid-rows-[auto_1fr] font-comic tracking-wide text-black antialiased dark:text-gray-100 max-sm:text-lg"
>
	<PageSearch bind:this={pageSearch} />
	<nav class=" sticky flex h-20 items-center justify-between bg-red-500 dark:bg-red-800">
		<a href="/" class="flex w-60 items-center justify-center">
			<img class="h-20 bg-black" src={pierre} alt="la pierre magique" />
		</a>
		<div class=" w-auto text-start text-3xl font-bold">Legend of Kingdom 2 Wiki</div>
		<div class=" flex gap-2">
			<a href="/admin">
				<OldButton class=" flex h-10 items-center justify-center p-2">
					admin
					{#key userStore.user}
						<div in:fly={{ y: -20 }}>
							{#if userStore.user}
								<LockOpen class="ml-2" strokeWidth="2.5" />
							{:else}
								<Lock class="ml-2" strokeWidth="2.5" />
							{/if}
						</div>
					{/key}
				</OldButton>
			</a>
			<DarkToggle class="mr-2 h-10 w-10"></DarkToggle>
		</div>
	</nav>
	<main class="grid h-full grid-cols-[auto_1fr] overflow-hidden bg-inherit text-inherit">
		<aside
			class="sticky grid h-full max-h-lvh max-w-60 grid-rows-[1fr_auto] overflow-hidden
			bg-red-500 pt-0 dark:bg-red-800"
		>
			<div class="m-2 flex h-full w-56 flex-col gap-2">
				<OldButton class="bg-red-500 px-4 py-2" type="button">Page au hasard</OldButton>
				<OldButton class="bg-green-500 px-4 py-2" type="button" onclick={pageSearch?.searchButton}
					>Rechercher</OldButton
				>
				{#if headingsStore.headings.length > 0}
					<Headings />
				{:else}
					<div class="flex h-full items-center justify-center">
						<div class="text-2xl text-gray-100">?</div>
					</div>
				{/if}
			</div>
			<a href="/about" class="">
				<OldButton class="w-full bg-blue-500 px-4 py-2">A propos de LOK2</OldButton>
			</a>
		</aside>
		<div class="w-full justify-center overflow-y-auto">
			{@render children()}
		</div>
	</main>
</div>
