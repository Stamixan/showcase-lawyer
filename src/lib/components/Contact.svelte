<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';
	import { toast } from 'svelte-sonner';
	import { validateInquiry, type ValidationErrors } from '$lib/utils/validation';
	import PrivacyModal from './PrivacyModal.svelte';
	import MarkdownToolbar from '$lib/components/MarkdownToolbar.svelte';
	import { reveal } from '$lib/actions/reveal';
	import MapPin from '$lib/components/icons/MapPin.svelte';
	import Phone from '$lib/components/icons/Phone.svelte';
	import Mail from '$lib/components/icons/Mail.svelte';
	import Clock from '$lib/components/icons/Clock.svelte';
	import Copy from '$lib/components/icons/Copy.svelte';
	import MapDisabled from '$lib/components/icons/MapDisabled.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';

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
		t,
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
							<MapPin class="h-6 w-6 text-primary" />
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
													toast.success(t.contact.labels.address_copied);
												}}
												class="text-text/40 opacity-0 transition-all group-hover:opacity-100 hover:text-primary focus:opacity-100"
												title={t.contact.labels.copy_address}
												aria-label={t.contact.labels.copy_address}
											>
												<Copy class="h-5 w-5" />
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
													toast.success(t.contact.labels.address_copied);
												}}
												class="ml-2 inline-flex text-text/40 transition-colors hover:text-primary"
												title={t.contact.labels.copy_address}
											>
												<Copy class="h-5 w-5" />
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
							<Phone class="h-6 w-6 text-primary" />
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
							<Mail class="h-6 w-6 text-primary" />
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
							<Clock class="h-6 w-6 text-primary" />
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
							<MapDisabled class="mb-4 h-12 w-12 text-text/40" />

							<p class="mb-4 text-sm text-text sm:text-base">
								{t.contact.maps.disabled}
							</p>
							<button
								onclick={acceptCookiesFromMap}
								class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
							>
								{t.contact.maps.accept_cta}
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
							<option>{t.common.other}</option>
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
							<Spinner class="h-5 w-5 text-white" />
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
		content={t.contact.form.privacy_content}
		t={t}
	/>
</section>
