<script lang="ts">
	import { page } from '$app/state';
	import { firmData } from '$lib/data/firms';

	// Attempt to detect language from URL, default to 'en'
	let lang = $derived(page.url.pathname.startsWith('/el') ? 'el' : 'en');
	let content = $derived(
		{
			en: {
				title: 'Page Not Found',
				desc: 'The page you are looking for has been removed or does not exist.',
				btn: 'Return to Home'
			},
			el: {
				title: 'Η σελίδα δεν βρέθηκε',
				desc: 'Η σελίδα που αναζητάτε έχει αφαιρεθεί ή δεν υπάρχει.',
				btn: 'Επιστροφή στην Αρχική'
			}
		}[lang]
	);
</script>

<div class="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
	<h1 class="font-serif text-6xl font-bold text-slate-800">404</h1>
	{#if content}
		<p class="mt-4 text-2xl font-light text-slate-600">{content.title}</p>
		<p class="mt-2 text-slate-500">{content.desc}</p>
	{/if}

	{#if content}
		<a
			href="/{lang}"
			class="mt-8 rounded-md bg-primary px-8 py-3 text-white transition-opacity hover:opacity-90"
		>
			{content.btn}
		</a>
	{/if}
</div>
