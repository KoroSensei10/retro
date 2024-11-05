<script lang="ts">
	import { headingsStore } from '../../../stores/headings/index.svelte';
	import type { PageData } from './$types';
	import markdownit from 'markdown-it';

	let { data }: { data: PageData } = $props();

	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		quotes: '“”‘’'
	});

	headingsStore.headings =
		data.pageContent?.body.match(/(?<=^|\n)#+\s.+/g)?.map((h) => h.replace(/#+\s/, '')) || [];

	const renderedMarkdown = md.render(data.pageContent?.body ?? '');
</script>

{#if data.pageContent}
	<div class="html_content">
		{@html renderedMarkdown}
	</div>
{:else}
	<h1>404</h1>
	<p>Not Found</p>
{/if}

<style lang="postcss">
	@import '../../../htmlcontent.postcss';
</style>
