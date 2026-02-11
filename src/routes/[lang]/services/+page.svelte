<script lang="ts">
	import Services from '$lib/components/Services.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
</script>

<div class="min-h-screen bg-slate-900 py-24">
	<div class="mx-auto mb-16 max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
		<h1 class="mb-6 font-serif text-4xl font-bold md:text-5xl">
			{data.t.services.title}
		</h1>
		<div class="mx-auto mb-8 h-1 w-24 bg-primary"></div>
		<p class="mx-auto max-w-2xl text-lg text-slate-300">
			{data.t.services.description}
		</p>
	</div>

	<Services services={firmData.services} />
</div>
