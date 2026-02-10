<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import About from '$lib/components/About.svelte';
	import Services from '$lib/components/Services.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { firmData as rawFirmData } from '$lib/data/firms';

	const firmData = rawFirmData.el;
</script>

<svelte:head>
	<title>{firmData.meta.title}</title>
	<meta name="description" content={firmData.meta.description} />
</svelte:head>

<Navbar firstName={firmData.lawyer.firstName} lastName={firmData.lawyer.lastName} />

<main>
	<Hero
		firstName={firmData.lawyer.firstName}
		lastName={firmData.lawyer.lastName}
		title={firmData.lawyer.title}
		description={firmData.lawyer.shortBio}
	/>

	<Stats
		yearsExperience={firmData.stats.yearsExperience}
		casesWon={firmData.stats.casesWon}
		successRate={firmData.stats.successRate}
		happyClients={firmData.stats.happyClients}
	/>

	<About
		yearsExperience={firmData.stats.yearsExperience}
		profileImage={firmData.lawyer.profileImage}
		aboutText={firmData.lawyer.aboutText}
		firstName={firmData.lawyer.firstName}
		lastName={firmData.lawyer.lastName}
	/>

	<Services services={firmData.services} />

	<Testimonials testimonials={firmData.testimonials} />

	<Contact
		phone={firmData.contact.phone}
		email={firmData.contact.email}
		address={firmData.contact.address}
		hours={firmData.contact.hours}
		socials={firmData.contact.socials}
	/>
</main>

<Footer firstName={firmData.lawyer.firstName} lastName={firmData.lawyer.lastName} />
