<script lang="ts">
	import '../app.css';
	import { fade, fly } from 'svelte/transition';
	import { Lock, LockOpen } from 'lucide-svelte';
	import DarkToggle from '../components/DarkToggle.svelte';
	import OldButton from '../components/OldButton.svelte';
	import { headingsStore } from '../stores/headings/index.svelte';
	import pierre from '../lib/assets/pierre_magique.png';
	import { userStore } from '../stores/auth/index.svelte';

	let { children } = $props();
</script>

<div
	class="grid h-svh grid-rows-[auto_1fr] font-comic tracking-wide text-black antialiased dark:text-gray-100 max-sm:text-lg"
>
	<nav class=" sticky flex h-20 items-center justify-between bg-red-500 dark:bg-red-800">
		<a href="/" class="flex w-60 items-center justify-center">
			<img class="h-20" src={pierre} alt="la pierre magique" />
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
