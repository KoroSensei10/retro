<script lang="ts">
	import '../app.css';
	import DarkToggle from '../components/DarkToggle.svelte';
	import OldButton from '../components/OldButton.svelte';
	import pierre from '../lib/assets/pierre_magique.png';
	import { headingsStore } from '../stores/headings/index.svelte';
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<div
	class="grid h-svh grid-rows-[auto_1fr] font-comic tracking-wide text-black antialiased dark:text-gray-100"
>
	<nav class=" sticky flex h-20 items-center justify-between bg-red-500 dark:bg-red-800">
		<a href="/" class="flex w-60 items-center justify-center">
			<img class="h-20" src={pierre} alt="la pierre magique" />
		</a>
		<div class=" w-auto text-start text-3xl font-bold">Legend of Kingdom 2 Wiki</div>
		<DarkToggle class="mr-2 h-10 w-10"></DarkToggle>
	</nav>
	<main class="grid h-full grid-cols-[auto_1fr] overflow-hidden">
		<aside
			class=" sticky grid h-full max-h-lvh w-60 grid-rows-[1fr_auto] bg-red-500 p-2 pt-0 dark:bg-red-800"
		>
			<div class="flex h-full flex-col gap-2">
				<OldButton class="bg-red-500 px-4 py-2">Page au hasard</OldButton>
				<OldButton class="bg-green-500 px-4 py-2">Rechercher</OldButton>
				{#if headingsStore.headings.length > 0}
					{#key headingsStore.headings}
						<div
							in:fade={{ duration: 400 }}
							class="flex w-full flex-col items-center overflow-y-auto border-2
			border-black bg-red-500 p-2 font-semibold transition-all"
						>
							<h3 class="pb-4 font-bold">Table des matières</h3>
							<ul class=" list-inside list-disc space-y-2 text-sm">
								{#each headingsStore.headings as heading}
									<li class="truncate text-ellipsis">
										<a href="#{heading}">{heading}</a>
									</li>
								{/each}
							</ul>
						</div>
					{/key}
				{:else}
					<div class="flex h-full w-full items-center justify-center">
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

<style>
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.blink {
		animation: blink 1s steps(1, start) infinite;
	}
</style>
