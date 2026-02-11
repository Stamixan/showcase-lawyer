<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
</script>

<div class="bg-slate-900 pt-24 pb-12">
	<div class="mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
		<h1 class="mb-6 font-serif text-4xl font-bold md:text-5xl">
			{data.t.contact.title}
		</h1>
		<div class="mx-auto mb-8 h-1 w-24 bg-primary"></div>
		<p class="mx-auto max-w-2xl text-lg text-slate-300">
			{data.t.contact.description}
		</p>
	</div>
</div>

<Contact
	phone={firmData.contact.phone}
	email={firmData.contact.email}
	address={firmData.contact.address}
	hours={firmData.contact.hours}
	socials={firmData.contact.socials}
	ui={firmData.ui}
	topics={firmData.services.map((s) => s.title)}
	lang={data.lang}
/>

<CookieBanner labels={data.t.cookies} />
