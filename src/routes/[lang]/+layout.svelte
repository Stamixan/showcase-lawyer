<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '../layout.css'; // Correct path relative to src/routes/[lang]/
	import { page } from '$app/state';
	import { blur, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { data, children } = $props();

	let firmData = $derived(data.firmData);
	let lang = $derived(data.lang);
	$effect(() => {
		document.documentElement.lang = lang;
	});
</script>

<svelte:head>
	<title>{data.t.meta.site_title}</title>
	<meta name="description" content={data.t.meta.site_description} />

	<!-- Open Graph -->
	<meta property="og:title" content={data.t.meta.site_title} />
	<meta property="og:description" content={data.t.meta.site_description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={new URL(firmData.lawyer.profileImage, page.url.origin).href} />
	<meta
		property="og:site_name"
		content={`${firmData.lawyer.firstName} ${firmData.lawyer.lastName}`}
	/>
	<meta property="og:locale" content={data.t.meta.locale} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.t.meta.site_title} />
	<meta name="twitter:description" content={data.t.meta.site_description} />
	<meta
		name="twitter:image"
		content={new URL(firmData.lawyer.profileImage, page.url.origin).href}
	/>
	{@html `<script type="application/ld+json">
    ${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Attorney',
			name: `${firmData.lawyer.firstName} ${firmData.lawyer.lastName}`,
			description: firmData.lawyer.shortBio,
			url: 'https://papadopoulos-law.gr',
			telephone: firmData.contact.phone,
			email: firmData.contact.email,
			address: {
				'@type': 'PostalAddress',
				streetAddress: `${firmData.contact.address.street} ${firmData.contact.address.number}`,
				addressLocality: firmData.contact.address.city,
				postalCode: firmData.contact.address.postalCode,
				addressCountry: 'GR'
			},
			openingHours: [firmData.contact.hours.weekdays, firmData.contact.hours.weekend],
			image: firmData.lawyer.profileImage,
			priceRange: '$$'
		})}
  </script>`}
</svelte:head>

<Navbar
	firstName={firmData.lawyer.firstName}
	lastName={firmData.lawyer.lastName}
	{lang}
	t={data.t}
/>

<main class="grid w-full grid-cols-1 overflow-x-hidden">
	{#key page.url.pathname}
		<div
			class="col-start-1 row-start-1 w-full"
			in:blur={{ amount: 8, duration: 600, delay: 100, easing: cubicOut }}
			out:fade={{ duration: 200, easing: cubicOut }}
		>
			{@render children()}
		</div>
	{/key}
</main>

<Footer
	firstName={firmData.lawyer.firstName}
	lastName={firmData.lawyer.lastName}
	{lang}
	socials={firmData.contact.socials}
	t={data.t}
/>
