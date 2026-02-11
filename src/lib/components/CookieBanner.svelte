<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { labels = { text: '', accept: '', decline: '' } } = $props();

	let showBanner = $state(false);

	onMount(() => {
		const preference = localStorage.getItem('cookie-consent');
		if (!preference) {
			showBanner = true;
		}
	});

	function acceptCookies() {
		localStorage.setItem('cookie-consent', 'accepted');
		showBanner = false;
		window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: 'accepted' }));
	}

	function declineCookies() {
		localStorage.setItem('cookie-consent', 'declined');
		showBanner = false;
		window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: 'declined' }));
	}
</script>

{#if showBanner}
	<div
		transition:fade
		class="fixed right-0 bottom-0 left-0 z-50 border-t border-text/10 bg-background p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:p-6"
	>
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
		>
			<div class="text-sm text-text md:text-base">
				{labels.text}
			</div>
			<div class="flex gap-4">
				<button
					onclick={declineCookies}
					class="rounded-lg border border-text/20 px-4 py-2 text-sm font-medium text-text transition hover:bg-text/5"
				>
					{labels.decline}
				</button>
				<button
					onclick={acceptCookies}
					class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
				>
					{labels.accept}
				</button>
			</div>
		</div>
	</div>
{/if}
