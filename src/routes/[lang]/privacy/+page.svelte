<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
	let lang = $derived(data.lang);
</script>

<svelte:head>
	<title
		>{lang === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'} | {firmData.lawyer.lastName} Law</title
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
			{lang === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
		</h1>

		<div class="prose max-w-none space-y-6 text-slate-600 prose-slate">
			{#if lang === 'el'}
				<p>
					Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς. Αυτή η Πολιτική
					Απορρήτου περιγράφει πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">1. Συλλογή Πληροφοριών</h2>
				<p>
					Συλλέγουμε πληροφορίες που μας παρέχετε απευθείας μέσω της φόρμας επικοινωνίας, όπως το
					όνομα, το email και το τηλέφωνό σας, με σκοπό την εξυπηρέτηση των νομικών σας αιτημάτων.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">2. Χρήση Πληροφοριών</h2>
				<p>
					Οι πληροφορίες σας χρησιμοποιούνται αποκλειστικά για την επικοινωνία μαζί σας και την
					παροχή των νομικών υπηρεσιών που ζητήσατε. Δεν μοιραζόμαστε τα δεδομένα σας με τρίτους
					χωρίς τη συγκατάθεσή σας.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">3. Ασφάλεια</h2>
				<p>
					Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την ασφάλεια των δεδομένων σας από
					μη εξουσιοδοτημένη πρόσβαση ή απώλεια.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">4. Τα Δικαιώματά σας</h2>
				<p>
					Έχετε το δικαίωμα πρόσβασης, διόρθωσης ή διαγραφής των προσωπικών σας δεδομένων που
					διατηρούμε. Παρακαλούμε επικοινωνήστε μαζί μας για οποιοδήποτε σχετικό αίτημα.
				</p>
			{:else}
				<p>
					The protection of your personal data is important to us. This Privacy Policy describes how
					we collect, use, and protect your information.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">1. Information Collection</h2>
				<p>
					We collect information that you provide to us directly via the contact form, such as your
					name, email, and phone number, for the purpose of serving your legal requests.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">2. Use of Information</h2>
				<p>
					Your information is used exclusively to communicate with you and provide the legal
					services you requested. We do not share your data with third parties without your consent.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">3. Security</h2>
				<p>
					We implement appropriate technical and organizational measures for the security of your
					data against unauthorized access or loss.
				</p>

				<h2 class="font-serif text-2xl font-bold text-slate-900">4. Your Rights</h2>
				<p>
					You have the right to access, correct, or delete your personal data that we maintain.
					Please contact us for any related request.
				</p>
			{/if}
		</div>
	</div>
</main>
