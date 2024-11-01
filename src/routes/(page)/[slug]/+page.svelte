<script lang="ts">
	import type { PageData } from './$types';
	import markdownit from 'markdown-it';

	let { data }: { data: PageData } = $props();

	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		quotes: '“”‘’'
	});

	const renderedMarkdown = md.render(data.pageContent?.body ?? '');
</script>

{data.slug}

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
