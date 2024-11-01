<script>
	import { fade } from 'svelte/transition';
	import { headingsStore } from '../stores/headings/index.svelte';
</script>

{#key headingsStore.headings}
	<div
		in:fade={{ duration: 400 }}
		class="flex flex-col items-center overflow-y-auto border-2
			border-black bg-red-500 p-2 font-semibold transition-all"
	>
		<h3 class="pb-4 font-bold">Table des matières</h3>
		<ul class=" w-full list-inside list-disc space-y-2 text-start text-sm">
			{#each headingsStore.headings as heading}
				<li class="truncate text-ellipsis">
					<a href="#{heading}">{heading}</a>
				</li>
			{/each}
		</ul>
	</div>
{/key}
