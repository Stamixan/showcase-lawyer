<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Services from '$lib/components/Services.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
</script>

<Hero
	firstName={firmData.lawyer.firstName}
	lastName={firmData.lawyer.lastName}
	title={firmData.lawyer.title}
	description={firmData.lawyer.shortBio}
	ui={firmData.ui}
	lang={data.lang}
/>

<Stats
	yearsExperience={firmData.stats.yearsExperience}
	casesWon={firmData.stats.casesWon}
	successRate={firmData.stats.successRate}
	happyClients={firmData.stats.happyClients}
	labels={firmData.stats.labels}
/>

<div class="border-t border-slate-800 bg-slate-900 py-12">
	<div class="mb-12 text-center">
		<h2 class="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
			{data.lang === 'el' ? 'Τομείς Δικαίου' : 'Practice Areas'}
		</h2>
		<div class="mx-auto h-1 w-24 bg-primary"></div>
	</div>
	<!-- Showing only first 3 services as a teaser -->
	<Services services={firmData.services.slice(0, 3)} />

	<div class="mt-12 text-center">
		<a
			href="/{data.lang}/services"
			class="inline-block rounded border border-white/20 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-white hover:text-slate-900"
		>
			{data.lang === 'el' ? 'Δείτε όλες τις υπηρεσίες' : 'View All Services'}
		</a>
	</div>
</div>
