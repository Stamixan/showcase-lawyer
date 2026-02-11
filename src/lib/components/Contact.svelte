<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';
	import { toast } from 'svelte-sonner';
	import { validateInquiry, type ValidationErrors } from '$lib/utils/validation';
	import PrivacyModal from './PrivacyModal.svelte';
	import MarkdownToolbar from '$lib/components/MarkdownToolbar.svelte';
	import { reveal } from '$lib/actions/reveal';

	let {
		phone = '',
		email = '',
		address = {
			street: '',
			number: '',
			city: '',
			postalCode: '',
			mapUrl: '',
			mapEmbedUrl: ''
		},
		hours = { weekdays: '', weekend: '' },
		socials = { facebook: '', instagram: '', linkedin: '' },
		ui = $bindable({
			form_title: 'Κλείστε Ραντεβού',
			form_desc:
				'Κάντε το πρώτο βήμα για την επίλυση των νομικών σας ζητημάτων. Επικοινωνήστε μαζί μας σήμερα για μια εμπιστευτική συνάντηση.',
			labels: {
				address: 'Διεύθυνση Γραφείου',
				phone: 'Τηλέφωνο',
				email: 'Email',
				hours: 'Ώρες Λειτουργίας',
				other: 'Άλλο'
			},
			form: {
				first_name: 'Όνομα',
				last_name: 'Επώνυμο',
				email: 'Email',
				phone: 'Τηλέφωνο',
				topic: 'Τομέας Δικαίου',
				message: 'Μήνυμα',
				message_placeholder: 'Περιγράψτε σύντομα το νομικό σας ζήτημα...',
				privacy_agree: 'Έχω διαβάσει και συμφωνώ με την',
				privacy_link: 'Πολιτική Απορρήτου',
				privacy_consent:
					'και δίνω τη συγκατάθεσή μου για την επεξεργασία των προσωπικών μου δεδομένων.',
				submit: 'Αποστολή Μηνύματος',
				submitting: 'Αποστολή...',
				success: 'Το μηνυμά σας εστάλη!',
				success_desc: 'Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.',
				error: 'Σφάλμα αποστολής',
				error_desc: 'Υπήρξε ένα πρόβλημα. Παρακαλώ ελέγξτε τη σύνδεσή σας ή προσπαθήστε αργότερα.',
				select_topic: 'Επιλέξτε τομέα δικαίου',
				privacy_validation: 'Παρακαλώ επιλέξτε αυτό το κουτάκι αν θέλετε να προχωρήσετε.'
			}
		}),
		topics = [] as string[],
		lang = 'el'
	} = $props();

	let formData = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		topic: ui.form.select_topic,
		message: '',
		privacyConsent: false,
		hp_fax: '' // Honeypot
	});

	let errors = $state<ValidationErrors>({});
	let isSubmitting = $state(false);
	let isPrivacyModalOpen = $state(false);
	let textareaRef = $state<HTMLTextAreaElement>();

	const privacyContentEl = `
		<p class="mb-4"><strong>Πολιτική Προστασίας Προσωπικών Δεδομένων</strong></p>
		<p class="mb-2">Το δικηγορικό μας γραφείο σέβεται την ιδιωτικότητά σας και δεσμεύεται να προστατεύει τα προσωπικά δεδομένα που μας παρέχετε. Η παρούσα πολιτική εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα στοιχεία σας.</p>
		<ul class="list-disc pl-5 mb-4 space-y-2">
			<li><strong>Συλλογή Δεδομένων:</strong> Συλλέγουμε μόνο τα απαραίτητα στοιχεία (όνομα, τηλέφωνο, email) για την επικοινωνία μαζί σας σχετικά με το νομικό σας ζήτημα.</li>
			<li><strong>Χρήση Δεδομένων:</strong> Τα στοιχεία σας χρησιμοποιούνται αποκλειστικά για την απάντηση στο αίτημά σας και την παροχή νομικών συμβουλών. Δεν κοινοποιούνται σε τρίτους χωρίς τη ρητή συγκατάθεσή σας, εκτός αν απαιτείται από το νόμο.</li>
			<li><strong>Ασφάλεια:</strong> Λαμβάνουμε όλα τα απαραίτητα τεχνικά μέτρα για την ασφάλεια των δεδομένων σας.</li>
			<li><strong>Δικαιώματα:</strong> Έχετε το δικαίωμα πρόσβασης, διόρθωσης ή διαγραφής των στοιχείων σας επικοινωνώντας μαζί μας.</li>
		</ul>
		<p>Με τη συμπλήρωση της φόρμας επικοινωνίας, αποδέχεστε την επεξεργασία των στοιχείων σας σύμφωνα με την παρούσα πολιτική.</p>
	`;

	const privacyContentEn = `
		<p class="mb-4"><strong>Privacy Policy</strong></p>
		<p class="mb-2">Our law firm respects your privacy and is committed to protecting the personal data you provide to us. This policy explains how we collect, use, and protect your information.</p>
		<ul class="list-disc pl-5 mb-4 space-y-2">
			<li><strong>Data Collection:</strong> We collect only necessary information (name, phone, email) to communicate with you regarding your legal matter.</li>
			<li><strong>Data Use:</strong> Your information is used exclusively to respond to your inquiry and provide legal advice. We do not share it with third parties without your explicit consent, unless required by law.</li>
			<li><strong>Security:</strong> We take all necessary technical measures to ensure the security of your data.</li>
			<li><strong>Rights:</strong> You have the right to access, correct, or delete your information by contacting us.</li>
		</ul>
		<p>By completing the contact form, you consent to the processing of your data in accordance with this policy.</p>
	`;

	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Clear previous errors
		errors = {};

		// Validate
		const validationErrors = validateInquiry(formData);
		if (validationErrors) {
			errors = validationErrors;
			if (errors.general) {
				toast.error('Σφάλμα Validations', { description: errors.general });
			}
			return;
		}

		isSubmitting = true;
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					phone: formData.phone,
					topic: formData.topic,
					message: formData.message,
					hp_fax: formData.hp_fax
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Submission failed');
			}

			toast.success(ui.form.success, {
				description: ui.form.success_desc,
				duration: 5000
			});

			formData = {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				topic: ui.form.select_topic,
				message: '',
				privacyConsent: false,
				hp_fax: ''
			};
		} catch (error: any) {
			console.error(error);
			// Display server-side verification error if available
			let msg = ui.form.error_desc;

			if (error.message?.includes('Text validation failed')) {
				msg = 'Παρακαλώ ελέγξτε τα στοιχεία σας.';
			}

			// Show raw error only in development, otherwise generic
			if (import.meta.env.DEV && error.message) {
				msg = error.message;
			}

			toast.error(ui.form.error, {
				description: msg
			});
		} finally {
			isSubmitting = false;
		}
	}

	let cookieConsent = $state<string | null>(null);

	onMount(() => {
		cookieConsent = localStorage.getItem('cookie-consent');
		const handleConsentUpdate = (e: CustomEvent) => {
			console.log('Consent updated:', e.detail);
			cookieConsent = e.detail;
		};
		window.addEventListener('cookie-consent-update', handleConsentUpdate as EventListener);
		return () => {
			window.removeEventListener('cookie-consent-update', handleConsentUpdate as EventListener);
		};
	});

	function acceptCookiesFromMap() {
		localStorage.setItem('cookie-consent', 'accepted');
		cookieConsent = 'accepted';
		window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: 'accepted' }));
	}
</script>

<section id="contact" class="bg-background py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-16 lg:grid-cols-2">
			<div use:reveal={{ delay: 0 }}>
				<h2 class="mb-6 font-serif text-4xl font-bold text-heading md:text-5xl">
					{ui.form_title}
				</h2>
				<p class="mb-8 text-text">
					{ui.form_desc}
				</p>
				<div class="space-y-6">
					<div class="flex items-start">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								></path>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								></path>
							</svg>
						</div>
						<div class="ml-4 flex-1">
							<div class="flex items-center justify-between">
								<h4 class="font-medium text-heading">{ui.labels.address}</h4>
							</div>
							<div class="flex items-start">
								<div class="grow">
									{#if address.mapUrl}
										<div class="group flex items-center gap-2">
											<a
												href={address.mapUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="text-primary underline transition-colors hover:text-accent"
											>
												{address.street}
												{address.number}
											</a>
											<button
												type="button"
												onclick={() => {
													const text = `${address.street} ${address.number}\n${address.postalCode} ${address.city}`;
													navigator.clipboard.writeText(text);
													toast.success(
														lang === 'el' ? 'Η διεύθυνση αντιγράφηκε!' : 'Address copied!'
													);
												}}
												class="text-text/40 opacity-0 transition-all group-hover:opacity-100 hover:text-primary focus:opacity-100"
												title={lang === 'el' ? 'Αντιγραφή' : 'Copy address'}
												aria-label={lang === 'el' ? 'Αντιγραφή διεύθυνσης' : 'Copy address'}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="h-5 w-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
													/>
												</svg>
											</button>
										</div>
										<span class="block text-text">{address.postalCode} {address.city}</span>
									{:else}
										<p class="text-text">
											{address.street}
											{address.number}
											<button
												type="button"
												onclick={() => {
													const text = `${address.street} ${address.number}\n${address.postalCode} ${address.city}`;
													navigator.clipboard.writeText(text);
													toast.success(
														lang === 'el' ? 'Η διεύθυνση αντιγράφηκε!' : 'Address copied!'
													);
												}}
												class="ml-2 inline-flex text-text/40 transition-colors hover:text-primary"
												title={lang === 'el' ? 'Αντιγραφή' : 'Copy address'}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="h-5 w-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
													/>
												</svg>
											</button>
											<br />
											{address.postalCode}
											{address.city}
										</p>
									{/if}
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-start">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								></path>
							</svg>
						</div>
						<div class="ml-4">
							<h4 class="font-medium text-heading">{ui.labels.phone}</h4>
							<p class="text-text">{phone}</p>
						</div>
					</div>
					<div class="flex items-start">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<div class="ml-4">
							<h4 class="font-medium text-heading">{ui.labels.email}</h4>
							<p class="text-text">{email}</p>
						</div>
					</div>
					<div class="flex items-start">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<div class="ml-4">
							<h4 class="font-medium text-heading">{ui.labels.hours}</h4>
							<p class="text-text">{hours.weekdays}<br />{hours.weekend}</p>
						</div>
					</div>
				</div>

				{#if address.mapEmbedUrl}
					{#if cookieConsent === 'accepted'}
						<div
							class="mt-8 h-64 w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg"
						>
							<iframe
								title="Google Map"
								src={address.mapEmbedUrl}
								width="100%"
								height="100%"
								style="border:0;"
								allowfullscreen
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
							>
							</iframe>
						</div>
					{:else}
						<div
							class="mt-8 flex h-64 w-full flex-col items-center justify-center rounded-lg border border-text/20 bg-background p-6 text-center shadow-lg print:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="mb-4 h-12 w-12 text-text/40"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 3l18 18"
									class="opacity-60"
								/>
							</svg>

							<p class="mb-4 text-sm text-text sm:text-base">
								{lang === 'el'
									? 'Ο χάρτης Google έχει απενεργοποιηθεί επειδή δεν αποδεχτήκατε τα cookies.'
									: 'Google Maps is disabled because you declined cookies.'}
							</p>
							<button
								onclick={acceptCookiesFromMap}
								class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
							>
								{lang === 'el' ? 'Αποδοχή Cookies & Εμφάνιση' : 'Accept Cookies & Show Map'}
							</button>
						</div>
					{/if}
				{/if}
			</div>
			<div
				class="h-fit rounded-lg bg-gray-50/50 p-8 shadow-2xl lg:p-12"
				use:reveal={{ delay: 200 }}
			>
				<form onsubmit={handleSubmit} class="space-y-6">
					<div class="grid gap-6 md:grid-cols-2">
						<div>
							<label class="mb-2 block text-sm font-medium text-text" for="firstName"
								>{ui.form.first_name}</label
							>
							<input
								type="text"
								id="firstName"
								bind:value={formData.firstName}
								required
								class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-primary {errors.firstName
									? 'border-red-500'
									: ''}"
							/>
							{#if errors.firstName}
								<p class="mt-1 text-sm text-red-600">{errors.firstName}</p>
							{/if}
						</div>
						<div>
							<label class="mb-2 block text-sm font-medium text-text" for="lastName"
								>{ui.form.last_name}</label
							>
							<input
								type="text"
								id="lastName"
								bind:value={formData.lastName}
								required
								class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-primary {errors.lastName
									? 'border-red-500'
									: ''}"
							/>
							{#if errors.lastName}
								<p class="mt-1 text-sm text-red-600">{errors.lastName}</p>
							{/if}
						</div>
					</div>
					<div>
						<label class="mb-2 block text-sm font-medium text-text" for="email"
							>{ui.form.email}</label
						>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-primary {errors.email
								? 'border-red-500'
								: ''}"
						/>
						{#if errors.email}
							<p class="mt-1 text-sm text-red-600">{errors.email}</p>
						{/if}
					</div>
					<div>
						<label class="mb-2 block text-sm font-medium text-text" for="phone"
							>{ui.form.phone}</label
						>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-primary {errors.phone
								? 'border-red-500'
								: ''}"
						/>
						{#if errors.phone}
							<p class="mt-1 text-sm text-red-600">{errors.phone}</p>
						{/if}
					</div>
					<div>
						<label class="mb-2 block text-sm font-medium text-text" for="topic"
							>{ui.form.topic}</label
						>
						<select
							id="topic"
							bind:value={formData.topic}
							class="w-full rounded-md border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-primary"
						>
							<option>{ui.form.select_topic}</option>
							{#each topics as topic}
								<option>{topic}</option>
							{/each}
							<option>{lang === 'el' ? 'Άλλο' : 'Other'}</option>
						</select>
					</div>
					<div>
						<label class="mb-2 block text-sm font-medium text-text" for="message"
							>{ui.form.message}</label
						>
						<textarea
							bind:this={textareaRef}
							id="message"
							rows="4"
							bind:value={formData.message}
							required
							class="w-full rounded-t-lg rounded-b-lg border border-gray-300 bg-white px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-primary {errors.message
								? 'border-red-500'
								: ''}"
							placeholder={ui.formMessagePlaceholder}
						></textarea>
						<div class="mt-2 flex flex-col gap-1 text-xs text-text/60">
							<span>{ui.form.markdown_hint}</span>
							<a
								href="https://www.markdownguide.org/cheat-sheet/"
								target="_blank"
								rel="noopener noreferrer"
								class="w-fit text-primary hover:underline"
							>
								{ui.form.markdown_guide}
							</a>
						</div>
						{#if errors.message}
							<p class="mt-1 text-sm text-red-600">{errors.message}</p>
						{/if}
					</div>

					<div class="flex items-start space-x-3">
						<input
							type="checkbox"
							id="privacy"
							bind:checked={formData.privacyConsent}
							required
							oninvalid={(e: Event) =>
								(e.target as HTMLInputElement).setCustomValidity(ui.form.privacy_validation)}
							oninput={(e: Event) => (e.target as HTMLInputElement).setCustomValidity('')}
							class="mt-1 h-4 w-4 rounded border-text/30 text-primary focus:ring-primary"
						/>
						<label for="privacy" class="text-sm text-text">
							{ui.form.privacy_agree}
							<button
								type="button"
								onclick={() => (isPrivacyModalOpen = true)}
								class="inline cursor-pointer border-0 bg-transparent p-0 text-primary hover:underline"
							>
								{ui.form.privacy_link}
							</button>
							{ui.form.privacy_consent}
						</label>
					</div>

					<!-- Honeypot Field (Invisible) -->
					<div class="hidden" aria-hidden="true">
						<label for="fax_input">Fax Number</label>
						<input
							type="text"
							id="fax_input"
							name="fax_number"
							tabindex="-1"
							autocomplete="off"
							bind:value={formData.hp_fax}
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary py-4 font-medium text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if isSubmitting}
							<svg
								class="h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span>{ui.form.submitting}</span>
						{:else}
							{ui.form.submit}
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>

	<MarkdownToolbar textarea={textareaRef} bind:value={formData.message} />
	<PrivacyModal
		isOpen={isPrivacyModalOpen}
		onClose={() => (isPrivacyModalOpen = false)}
		title={ui.form.privacy_link}
		content={lang === 'el' ? privacyContentEl : privacyContentEn}
	/>
</section>
