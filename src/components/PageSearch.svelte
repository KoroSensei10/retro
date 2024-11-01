<script lang="ts">
	import { collection, getDocs, query, where } from 'firebase/firestore/lite';
	import { db } from '$lib/firebase';
	import type { Page } from '../types';
	import { click_outside, focusElement } from '../components/actions.svelte';
	import { navigating } from '$app/stores';

	export const searchButton = (e: MouseEvent) => {
		e.preventDefault();
		e.stopImmediatePropagation();
		show_search = !show_search;
	};

	const search = (key_down_event: KeyboardEvent) => {
		if (key_down_event.key === 'k' && (key_down_event.ctrlKey || key_down_event.metaKey)) {
			key_down_event.preventDefault();
			show_search = !show_search;
		} else if (show_search && key_down_event.key === 'Escape') {
			show_search = false;
		}
	};

	let searchText = $state('');
	let show_search = $state(false);
	let searchResults: Page[] = $state([]);

	let timeout: ReturnType<typeof setTimeout>;
	let cooldown = 200;

	async function searchFirestore() {
		searchResults = [];
		if (searchText) {
			const lowerText = searchText.toLowerCase();

			// Construire la requête pour rechercher dans `tokens`
			const q = query(collection(db, 'pages'), where('tokens', 'array-contains', lowerText));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				searchResults.push(doc.data() as Page);
			});
		}
	}

	function debouncedSearchFirestore() {
		clearTimeout(timeout);
		timeout = setTimeout(searchFirestore, cooldown);
	}

	$effect(() => {
		if ($navigating) show_search = false;
		if (searchText) debouncedSearchFirestore();
	});
</script>

<svelte:window onkeydown={search} />

{#if show_search}
	<div class="absolute z-50 h-screen w-screen bg-black opacity-40 transition-all"></div>
	<div
		id="search"
		use:click_outside={{ fn: () => (show_search = false) }}
		class="absolute left-[50%] top-[20%] z-50 flex -translate-x-[50%] flex-col gap-4 bg-gray-500 p-4 opacity-100"
	>
		<label for="searchInput">Rechercher une page</label>
		<input
			bind:value={searchText}
			id="searchInput"
			name="searchInput"
			class="text-black"
			use:focusElement
			type="text"
		/>
		<ul>
			{#each searchResults as result}
				<li>{result.title}</li>
			{/each}
		</ul>
	</div>
{/if}
