<script lang="ts">
	import { flip } from 'svelte/animate';
	import { toastStore } from '../stores/toasts.svelte';
	import OldButton from './OldButton.svelte';
	import { fade } from 'svelte/transition';

	let { debug = false } = $props();

	function removeToast(id: number) {
		toastStore.remove(id);
	}

	$inspect(toastStore.toasts);
</script>

{#if debug}
	<OldButton
		class="fixed right-0 top-0 z-50 m-2 p-4"
		onclick={() =>
			toastStore.add({
				title: 'Je suis un toast',
				message: 'Et franchement je rend bien pour un toast en vrai !'
			})}>Add toast</OldButton
	>
{/if}
<ul class="fixed bottom-0 right-0 z-50 m-4 flex h-fit w-fit flex-col gap-2">
	{#each toastStore.toasts as toast (toast.id)}
		<li animate:flip={{ delay: 0, duration: 200 }} transition:fade={{ duration: 100 }}>
			<OldButton onclick={() => removeToast(toast.id)} class=" p-2">
				<div class="flex flex-col items-end">
					<div class="text-xl font-bold">{toast.title}</div>
					<div>{toast.message}</div>
				</div>
			</OldButton>
		</li>
	{/each}
</ul>
