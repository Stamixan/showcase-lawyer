<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	interface Service {
		title: string;
		description: string;
		iconPath: string;
	}

	let { services = [] as Service[] } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each services as service, i}
			<div
				use:reveal={{ delay: i * 100 }}
				class="rounded-lg border-t-4 border-primary bg-surface-card p-8 shadow-lg transition-shadow hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={service.iconPath}
						></path>
					</svg>
				</div>
				<h3 class="mb-3 font-serif text-2xl font-bold text-content-p">
					{service.title}
				</h3>
				<p class="text-content-s">{service.description}</p>
			</div>
		{/each}
	</div>
</div>
