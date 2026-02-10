<script lang="ts">
	import { onMount } from 'svelte';

	let { content, html = undefined, class: className = '' } = $props();

	let htmlContent = $state('');
	let isLoading = $state(true);

	onMount(async () => {
		if (html) {
			htmlContent = html;
			isLoading = false;
			return;
		}

		try {
			const [markedModule, dompurifyModule] = await Promise.all([
				import('marked'),
				import('isomorphic-dompurify')
			]);

			const { marked } = markedModule;
			const DOMPurify = dompurifyModule.default;

			marked.setOptions({
				breaks: true,
				gfm: true
			});

			const parsed = marked.parse(content || '') as string;
			htmlContent = DOMPurify.sanitize(parsed);
		} catch (error) {
			console.error('Failed to load markdown parser', error);
			htmlContent = content || ''; // Fallback
		} finally {
			isLoading = false;
		}
	});

	// Re-run if content changes after mount (for dynamic previews)
</script>

<div class="prose max-w-none prose-slate {className}">
	{#if isLoading}
		<div class="animate-pulse space-y-2">
			<div class="h-4 w-3/4 rounded bg-slate-200"></div>
			<div class="h-4 w-full rounded bg-slate-200"></div>
			<div class="h-4 w-5/6 rounded bg-slate-200"></div>
		</div>
	{:else}
		{@html htmlContent}
	{/if}
</div>
