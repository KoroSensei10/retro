<script lang="ts">
	import { onMount } from 'svelte';
	import markdownit from 'markdown-it';
	import { Bold, Heading, Italic, WrapText, Link, Save } from 'lucide-svelte';
	import hljs from 'highlight.js/lib/core';
	import mardown from 'highlight.js/lib/languages/markdown';
	import html from 'highlight.js/lib/languages/xml';
	import 'highlight.js/styles/github.css';

	import OldButton from '../../../components/OldButton.svelte';
	import { headingsStore } from '../../../stores/headings/index.svelte';
	import { db } from '$lib/firebase';
	import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
	import type { Page } from '../../../types';
	import { click_outside } from '../../../components/actions.svelte';
	import Images from '../../../components/Images.svelte';

	hljs.registerLanguage('html', html);
	hljs.registerLanguage('markdown', mardown);

	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		quotes: '“”‘’'
	});

	const md_symbols = {
		bold: '**',
		italic: '_',
		heading: '#',
		EOL: '  \n',
		link: {
			start: '[',
			end: ']()'
		}
	};

	// svelte-ignore non_reactive_update
	let textarea: HTMLTextAreaElement;
	let content = $state('');
	let title = $state('');
	let contentHighlight = $derived.by(() => {
		return hljs.highlightAuto(content, ['markdown', 'html']).value;
	});

	let slug = $derived.by(() => {
		return title.toLowerCase().replace(/\s/g, '-');
	});

	let pages: Page[] = $state([]);

	let displayHeading = $state(false);

	let preview = $derived.by(() => {
		return md.render(content);
	});

	let previousHeadings: string[] = [];
	let headings = $derived.by(() => {
		const newHeadings = content.match(/(?<=^|\n)#+\s.+/g) || [];
		if (JSON.stringify(newHeadings) !== JSON.stringify(previousHeadings)) {
			previousHeadings = newHeadings;
			return newHeadings;
		}
		return previousHeadings;
	});

	const updateTextarea = (substring: string, start: number, end: number) => {
		content = content.substring(0, start) + substring + content.substring(end);
	};

	const new_line = () => {
		textarea.focus();
		const startSelection = textarea?.selectionStart;
		const endSelection = textarea?.selectionEnd;
		updateTextarea(md_symbols.EOL, startSelection, endSelection);
	};

	const bold = () => {
		textarea.focus();
		const startSelection = textarea?.selectionStart;
		const endSelection = textarea?.selectionEnd;
		if (startSelection === endSelection || startSelection === null || endSelection === null) {
			// TODO : set the cursor between the two stars
			updateTextarea(md_symbols.bold + md_symbols.bold, startSelection, endSelection);
			return;
		}
		const boldString =
			md_symbols.bold + content.substring(startSelection, endSelection) + md_symbols.bold;
		updateTextarea(boldString, startSelection, endSelection);
	};

	const italic = () => {
		textarea.focus();
		const startSelection = textarea?.selectionStart;
		const endSelection = textarea?.selectionEnd;
		if (startSelection === endSelection || startSelection === null || endSelection === null) {
			// TODO : set the cursor between the two stars
			updateTextarea(md_symbols.italic, startSelection, endSelection);
			return;
		}
		const italicString =
			md_symbols.italic + content.substring(startSelection, endSelection) + md_symbols.italic;
		updateTextarea(italicString, startSelection, endSelection);
	};

	const link = () => {
		textarea.focus();
		const startSelection = textarea?.selectionStart;
		const endSelection = textarea?.selectionEnd;
		if (startSelection === endSelection || startSelection === null || endSelection === null) {
			// TODO : set the cursor between []
			updateTextarea(md_symbols.link.start + md_symbols.link.end, startSelection, endSelection);
			return;
		}
		const linkString =
			md_symbols.link.start + content.substring(startSelection, endSelection) + md_symbols.link.end;
		updateTextarea(linkString, startSelection, endSelection);
	};

	function generateTokens(...texts: string[]): string[] {
		return texts
			.join(' ')
			.replace(/[^a-zA-Z0-9\s\u00C0-\u017F'"]/g, '') // Keep accents and quotes
			.replace(/\s+/g, ' ')
			.toLowerCase()
			.split(' ')
			.filter((word, index, allWords) => allWords.indexOf(word) === index); // Supprime les doublons
	}
	const save = async () => {
		try {
			if (!slug) {
				console.error('No slug');
				return;
			} else if (!content) {
				console.error('No content');
				return;
			}

			await setDoc(doc(db, 'pages', slug), {
				body: content,
				slug,
				title,
				tokens: generateTokens(title, content)
			});
			// TODO : Add a toast
			console.log('Document written with slug: ', slug);
		} catch (error) {
			// TODO : Add a toast
			console.error('Error adding document: ', error);
		}
	};

	const key_handlers = (key_down_event: KeyboardEvent) => {
		if (!key_down_event.ctrlKey && !key_down_event.metaKey) {
			return;
		}

		const key = key_down_event.key;
		switch (key) {
			case 'b':
				key_down_event.preventDefault();
				bold();
				break;
			case 'i':
				key_down_event.preventDefault();
				italic();
				break;
			case 'n':
				key_down_event.preventDefault();
				new_line();
				break;
			case 'l':
				key_down_event.preventDefault();
				link();
				break;
			case 's':
				key_down_event.preventDefault();
				save();
				break;
		}
	};

	const change_page = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const selected_page = pages.find((page) => page.slug === target.value);
		if (selected_page) {
			title = selected_page.title;
			content = selected_page.body;
		} else {
			title = '';
			content = '';
		}
	};

	$effect(() => {
		if (headings) {
			headingsStore.headings = headings.map((heading) => {
				return heading.replace(/#+\s/, '');
			});
		}
	});

	onMount(async () => {
		textarea.focus();
		pages = (await getDocs(collection(db, 'pages'))).docs.map((doc) => doc.data()) as Page[];
	});
</script>

<svelte:window onkeydown={key_handlers} />

<div class="grid h-full w-full grid-rows-[auto_1fr] bg-inherit text-inherit">
	<!-- Mardown Tools -->
	<div class=" grid h-auto w-full grid-cols-[auto_1fr] items-center border-b p-2">
		<div class="flex h-full flex-wrap gap-2">
			<OldButton class="h-6 w-6 bg-gray-300" onclick={bold}>
				<Bold class="h-fit w-full" color={'black'} strokeWidth={1.5} />
			</OldButton>
			<OldButton class="h-6 w-6 bg-gray-300" onclick={italic}>
				<Italic class="h-fit w-full" color={'black'} strokeWidth={1.5} />
			</OldButton>
			<div class="relative flex" use:click_outside={{ fn: () => (displayHeading = false) }}>
				<OldButton class="h-6 w-6 border bg-gray-300">
					<Heading
						class="h-fit w-full"
						color="black"
						strokeWidth={1.5}
						onclick={() => (displayHeading = !displayHeading)}
					/>
				</OldButton>
				{#if displayHeading}
					<div
						class=" absolute bottom-0 z-30 flex h-fit w-fit translate-y-[100%] gap-1 border border-black bg-white p-1"
						aria-label="Toggle Heading Display"
					>
						{#each Array.from({ length: 6 }, (_, i) => i + 1) as level}
							<OldButton
								class="h-6 w-6 border bg-gray-300 text-black dark:text-black"
								onclick={() => {
									textarea.focus();
									const startSelection = textarea?.selectionStart;
									const endSelection = textarea?.selectionEnd;
									const headingString = `${md_symbols.heading.repeat(level)} `;
									updateTextarea(headingString, startSelection, endSelection);
									displayHeading = false;
								}}
							>
								{level}
							</OldButton>
						{/each}
					</div>
				{/if}
			</div>
			<OldButton class="h-6 w-6 bg-gray-300" onclick={link}>
				<Link class="h-fit w-full" color="black" strokeWidth={1.5} />
			</OldButton>
			<OldButton class="h-6 w-6 bg-gray-300" onclick={new_line}>
				<WrapText class="h-fit w-full" color="black" strokeWidth={1.5} />
			</OldButton>
			<Images {textarea} {updateTextarea} />

			<select
				name="page"
				id="page"
				onchange={change_page}
				class="flex h-6 w-fit border-2 border-black border-l-gray-100 border-t-gray-100 bg-gray-300 py-0 text-black dark:text-black"
			>
				<option class="" selected value="">Nouvelle page</option>
				{#each pages as page}
					<option value={page.slug}>{page.title}</option>
				{/each}
			</select>
			<div class="h-6">
				{#if title}
					<div class="">{title}</div>
				{:else}
					<input
						type="text"
						class="h-6 w-fit border-2 border-gray-100 border-l-black border-t-black bg-gray-300 py-0 text-black dark:text-black"
						placeholder="Titre"
					/>
				{/if}
			</div>
		</div>

		<OldButton class="h-6 w-6 justify-self-end border bg-gray-300">
			<Save class="h-fit w-full" color={'black'} strokeWidth={1.5} onclick={save} />
		</OldButton>
	</div>
	<!-- Editor -->
	<div class=" grid max-h-full min-h-full grid-rows-[auto_1fr]">
		<div class="relative h-full min-h-60 w-full">
			<textarea
				bind:this={textarea}
				name="pageEditor"
				bind:value={content}
				id="pageEditor"
				class="absolute left-0 top-0 h-full w-full border-x-0 border-b bg-inherit p-0 opacity-0 focus-within:ring-0 focus:border-none"
			></textarea>
			<div
				class="pointer-events-none absolute left-0 top-0 h-full w-full bg-inherit"
				style="white-space: pre-wrap; overflow-wrap: break-word;"
			>
				{#if contentHighlight}
					{@html contentHighlight}
				{:else}
					{content}
				{/if}
			</div>
		</div>
		<!-- Preview -->
		<div class="relative h-full min-h-20 w-full text-wrap break-words border">
			<div class="html_content">
				{@html preview}
			</div>
			<div
				class="absolute left-[50%] top-[50%] -z-10 -translate-x-[50%] -translate-y-[50%] rotate-45 text-2xl opacity-20"
			>
				Preview
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@import '../../../htmlcontent.postcss';
</style>
