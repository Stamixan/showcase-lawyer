<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Stats from '$lib/components/Stats.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
</script>

<div class="bg-slate-900 pt-24 pb-12">
	<div class="mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
		<h1 class="mb-6 font-serif text-4xl font-bold md:text-5xl">
			{data.lang === 'el' ? 'Σχετικά με εμάς' : 'About Us'}
		</h1>
		<div class="mx-auto mb-8 h-1 w-24 bg-primary"></div>
	</div>
</div>

<About
	yearsExperience={firmData.stats.yearsExperience}
	profileImage={firmData.lawyer.profileImage}
	aboutHtml={firmData.lawyer.aboutText}
	firstName={firmData.lawyer.firstName}
	lastName={firmData.lawyer.lastName}
	ui={firmData.ui}
/>

<Stats
	yearsExperience={firmData.stats.yearsExperience}
	casesWon={firmData.stats.casesWon}
	successRate={firmData.stats.successRate}
	happyClients={firmData.stats.happyClients}
	labels={firmData.stats.labels}
/>
