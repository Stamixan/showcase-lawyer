<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
	let lang = $derived(data.lang);
</script>

<svelte:head>
	<title>{data.t.footer.privacy} | {firmData.lawyer.lastName} Law</title>
</svelte:head>

<Navbar
	firstName={firmData.lawyer.firstName}
	lastName={firmData.lawyer.lastName}
	{lang}
	t={data.t}
/>

<main class="min-h-screen bg-white py-32">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<button
			onclick={() => history.back()}
			class="mb-8 inline-block cursor-pointer font-medium text-primary hover:text-primary/80"
			>← {data.t.common.back}</button
		>

		<h1 class="mb-8 font-serif text-4xl font-bold text-slate-900">
			{data.t.footer.privacy}
		</h1>

		<div class="prose prose-slate max-w-none space-y-6 text-slate-600">
			{@html data.t.contact.form.privacy_full_body}
		</div>
	</div>
</main>
