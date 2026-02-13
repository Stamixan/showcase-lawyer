<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { MouseEventHandler, KeyboardEventHandler } from 'svelte/elements';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
		title?: string;
		content?: string;
		t?: any;
	}

	let {
		isOpen = false,
		onClose = () => {},
		title = '',
		content = '',
		t = { common: { close: 'Close' } }
	}: Props = $props();

	const handleKeydown: KeyboardEventHandler<Window> = (e) => {
		if (e.key === 'Escape' && isOpen) {
			onClose();
		}
	};
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- Backdrop -->
	<div
		role="button"
		class="fixed inset-0 z-50 flex cursor-default items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		onclick={onClose}
		aria-label="Close modal"
		tabindex="-1"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') onClose();
		}}
	>
		<!-- Modal -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="relative max-h-[90vh] w-full max-w-2xl cursor-auto overflow-y-auto rounded-2xl bg-background p-8 text-left shadow-2xl"
			transition:scale={{ duration: 200, start: 0.95 }}
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<div class="mb-6 flex items-center justify-between">
				<h3 class="font-serif text-2xl font-bold text-heading">{title}</h3>
				<button
					onclick={onClose}
					type="button"
					class="rounded-full p-2 text-text/60 transition-colors hover:bg-text/5 hover:text-heading"
					aria-label="Close"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="prose prose-slate max-w-none text-text">
				<!-- Render content as HTML if needed, or just text -->
				{@html content}
			</div>

			<div class="mt-8 flex justify-end">
				<button
					onclick={onClose}
					type="button"
					class="rounded-lg bg-text/5 px-5 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-text/10"
				>
					{t.common.close}
				</button>
			</div>
		</div>
	</div>
{/if}
