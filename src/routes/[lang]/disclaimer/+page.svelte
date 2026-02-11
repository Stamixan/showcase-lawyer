<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
	let lang = $derived(data.lang);
</script>

<svelte:head>
	<title
		>{lang === 'el' ? 'Αποποίηση Ευθυνών' : 'Disclaimer'} | {firmData.lawyer.lastName} Law</title
	>
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
			>← {lang === 'el' ? 'Επιστροφή' : 'Back'}</button
		>

		<h1 class="mb-8 font-serif text-4xl font-bold text-slate-900">
			{lang === 'el' ? 'Αποποίηση Ευθυνών' : 'Disclaimer'}
		</h1>

		<div class="prose max-w-none space-y-6 text-slate-600 prose-slate">
			{#if lang === 'el'}
				<h2 class="font-serif text-2xl font-bold text-slate-900">Όχι Νομική Συμβουλή</h2>
				<p>
					Το περιεχόμενο αυτής της ιστοσελίδας προορίζεται αποκλειστικά για ενημερωτικούς σκοπούς.
					Δεν αποτελεί νομική συμβουλή ούτε δημιουργεί σχέση εντολέα-δικηγόρου.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">Καμία Εγγύηση</h2>
				<p>
					Παρόλο που προσπαθούμε να διατηρούμε τις πληροφορίες ακριβείς και ενημερωμένες, δεν
					παρέχουμε καμία εγγύηση για την πληρότητα ή την ορθότητα του περιεχομένου.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">Εξωτερικοί Σύνδεσμοι</h2>
				<p>
					Αυτή η ιστοσελίδα ενδέχεται να περιέχει συνδέσμους προς τρίτες ιστοσελίδες. Δεν φέρουμε
					καμία ευθύνη για το περιεχόμενο ή τις πρακτικές απορρήτου αυτών των ιστοσελίδων.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">Επικοινωνία</h2>
				<p>
					Για συγκεκριμένα νομικά ζητήματα, σας συνιστούμε να επικοινωνήσετε απευθείας με το γραφείο
					μας για την παροχή εξειδικευμένης νομικής υποστήριξης.
				</p>
			{:else}
				<h2 class="font-serif text-2xl font-bold text-slate-900">No Legal Advice</h2>
				<p>
					The content of this website is intended solely for informational purposes. It does not
					constitute legal advice nor does it create an attorney-client relationship.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">No Warranty</h2>
				<p>
					Although we strive to keep the information accurate and up-to-date, we provide no warranty
					regarding the completeness or accuracy of the content.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">External Links</h2>
				<p>
					This website may contain links to third-party websites. We bear no responsibility for the
					content or privacy practices of these websites.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">Contact</h2>
				<p>
					For specific legal issues, we recommend that you contact our office directly for
					specialized legal support.
				</p>
			{/if}
		</div>
	</div>
</main>
