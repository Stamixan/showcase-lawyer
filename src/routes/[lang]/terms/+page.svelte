<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
	let lang = $derived(data.lang);
</script>

<svelte:head>
	<title>{lang === 'el' ? 'Όροι Χρήσης' : 'Terms of Use'} | {firmData.lawyer.lastName} Law</title>
</svelte:head>

<Navbar firstName={firmData.lawyer.firstName} lastName={firmData.lawyer.lastName} {lang} />

<main class="min-h-screen bg-white py-32">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<button
			onclick={() => history.back()}
			class="mb-8 inline-block cursor-pointer font-medium text-primary hover:text-primary/80"
			>← {lang === 'el' ? 'Επιστροφή' : 'Back'}</button
		>

		<h1 class="mb-8 font-serif text-4xl font-bold text-slate-900">
			{lang === 'el' ? 'Όροι Χρήσης' : 'Terms of Use'}
		</h1>

		<div class="prose max-w-none space-y-6 text-slate-600 prose-slate">
			{#if lang === 'el'}
				<p>
					Καλώς ήρθατε στην ιστοσελίδα μας. Η χρήση αυτής της ιστοσελίδας διέπεται από τους
					ακόλουθους όρους χρήσης:
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">1. Αποδοχή Όρων</h2>
				<p>
					Με την πρόσβαση σε αυτή την ιστοσελίδα, αποδέχεστε πλήρως αυτούς τους όρους. Εάν
					διαφωνείτε με οποιοδήποτε μέρος, παρακαλούμε να μη χρησιμοποιήσετε την ιστοσελίδα.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">2. Πνευματική Ιδιοκτησία</h2>
				<p>
					Το περιεχόμενο αυτής της ιστοσελίδας, συμπεριλαμβανομένων κειμένων και γραφικών, αποτελεί
					πνευματική ιδιοκτησία του γραφείου μας και προστατεύεται από τη σχετική νομοθεσία.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">3. Περιορισμός Ευθύνης</h2>
				<p>
					Οι πληροφορίες που παρέχονται σε αυτή την ιστοσελίδα είναι μόνο για γενική ενημέρωση και
					δεν αποτελούν νομική συμβουλή.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">4. Τροποποιήσεις</h2>
				<p>
					Διατηρούμε το δικαίωμα να τροποποιούμε αυτούς τους όρους οποιαδήποτε στιγμή χωρίς
					προειδοποίηση.
				</p>
			{:else}
				<p>
					Welcome to our website. The use of this website is governed by the following terms of use:
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
				<p>
					By accessing this website, you fully accept these terms. If you disagree with any part,
					please do not use the website.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">2. Intellectual Property</h2>
				<p>
					The content of this website, including text and graphics, is the intellectual property of
					our firm and is protected by relevant legislation.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">3. Limitation of Liability</h2>
				<p>
					The information provided on this website is for general information only and does not
					constitute legal advice.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">4. Amendments</h2>
				<p>We reserve the right to modify these terms at any time without prior notice.</p>
			{/if}
		</div>
	</div>
</main>
