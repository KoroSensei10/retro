<script lang="ts">
	import { ImagePlus, Upload, Trash } from 'lucide-svelte';
	import OldButton from './OldButton.svelte';
	import { click_outside } from './actions.svelte';
	import { onMount } from 'svelte';
	import { getAllImages, uploadFile } from '$lib/firebase/images';
	import type { Image } from '../types';
	import { addToast } from '../stores/toasts.svelte';

	type Props = {
		textarea: HTMLTextAreaElement;
		updateTextarea: (text: string, startSelection: number, endSelection: number) => void;
	};
	let { textarea, updateTextarea }: Props = $props();

	let displayImageDropdown = $state(false);
	let images: Image[] = $state([]);
	let selectedImageName = $state<string | null>(null);

	let form = $state<HTMLFormElement | null>(null);
	let selectedFile = $state<File | null>(null);

	const insertImage = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const startSelection = textarea?.selectionStart;
		const endSelection = textarea?.selectionEnd;
		const imageString = `![${target.selectedOptions[0].text}](${target.value})`;
		updateTextarea(imageString, startSelection, endSelection);
		selectedImageName = target.selectedOptions[0].text;
	};

	async function uploadImage(e: SubmitEvent) {
		e.preventDefault();
		if (!form) return;
		const formData = new FormData(form);
		const file = formData.get('addImage') as File;
		if (file) {
			const filePath = `images/${file.name}`;
			try {
				const downloadURL = await uploadFile(file, filePath);
				console.log('Fichier uploadé, URL :', downloadURL);
				images = await getAllImages();
				addToast({
					title: 'Image uploadée',
					message: "L'image a bien été uploadée",
					timeoutInMs: 3000
				});
			} catch (error) {
				console.error("Erreur lors de l'upload :", error);
				addToast({
					title: "Erreur lors de l'upload",
					message: "Une erreur est survenue lors de l'upload de l'image",
					timeoutInMs: 3000
				});
			}
		}
	}

	onMount(async () => {
		images = await getAllImages();
	});
</script>

<div class="relative flex" use:click_outside={{ fn: () => (displayImageDropdown = false) }}>
	<OldButton
		class="h-6 w-6 border bg-gray-300"
		onclick={() => (displayImageDropdown = !displayImageDropdown)}
	>
		<ImagePlus class="h-fit w-full" color="black" strokeWidth={1.5} />
	</OldButton>
	{#if displayImageDropdown}
		<div
			class="absolute bottom-0 z-30 flex h-fit w-fit translate-y-[100%] gap-1 border border-black bg-white p-1"
		>
			<div class="flex flex-col gap-2 text-black">
				<select
					name="images"
					id="images"
					onchange={insertImage}
					class="flex h-6 w-fit border-2 border-black border-l-gray-100 border-t-gray-100 bg-gray-300 py-0 text-black dark:text-black"
				>
					<option class="" selected value="">Select Image</option>
					{#each images as image}
						<option value={image.url}>{image.name}</option>
					{/each}
				</select>
				{#if selectedFile}
					<div class=" flex w-full flex-col items-center">
						<img
							alt="uploadedImage"
							src={URL.createObjectURL(selectedFile)}
							class="h-20 w-20 object-cover"
						/>
						<p>{selectedFile.name}</p>
					</div>
					<OldButton
						class="h-6 w-6 bg-gray-300"
						onclick={() => {
							selectedFile = null;
							form?.reset();
						}}
					>
						<Trash class="h-fit w-full" color="black" strokeWidth={1.5} />
					</OldButton>
				{/if}
			</div>
			<form onsubmit={uploadImage} class="flex gap-1" bind:this={form}>
				<OldButton class="relative h-6 w-6 cursor-pointer bg-gray-300">
					<input
						class=" absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
						type="file"
						name="addImage"
						multiple={false}
						aria-label="addImage"
						accept="image/*"
						onchange={(e) => (selectedFile = (e.target as HTMLInputElement).files?.[0] || null)}
					/>
					<ImagePlus class="h-fit w-full cursor-pointer" color="black" strokeWidth={1.5} />
				</OldButton>
				<OldButton
					class="h-6 w-6 bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-500"
					type="submit"
					disabled={!selectedFile}
				>
					<Upload class="h-fit w-full" color="black" strokeWidth={1.5} />
				</OldButton>
			</form>
		</div>
	{/if}
</div>
