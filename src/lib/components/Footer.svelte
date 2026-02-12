<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { convex } from '$lib/convex';

	let {
		firstName = '',
		lastName = '',
		lang = 'el',
		socials = { facebook: '', instagram: '', linkedin: '' },
		t
	} = $props();

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	async function subscribe(e: Event) {
		e.preventDefault();
		if (!email) return;
		status = 'loading';
		try {
			await convex.mutation(api.newsletter.subscribe, { email, source: 'footer' });
			status = 'success';
			email = '';
			setTimeout(() => {
				status = 'idle';
			}, 3000);
		} catch (err) {
			console.error(err);
			status = 'error';
			setTimeout(() => {
				status = 'idle';
			}, 3000);
		}
	}
</script>

<footer class="border-t border-white/5 bg-secondary py-12 text-white/90">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Changed to grid-cols-2 on mobile (base), then md:4, lg:5 -->
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
			<!-- Brand section spans full width (2 cols) on mobile -->
			<div class="col-span-2 lg:col-span-2">
				<a href="/{lang}" class="mb-4 block font-serif text-2xl font-bold text-primary">
					{firstName.charAt(0)}. {lastName}
				</a>
				<p class="mb-6 max-w-sm text-white/80">
					{t.footer.tagline}
				</p>
				{#if socials.facebook || socials.instagram || socials.linkedin}
					<div>
						<h4 class="mb-4 text-sm font-semibold tracking-wider text-white/70 uppercase">
							{t.footer.follow_us}
						</h4>
						<div class="flex space-x-4">
							{#if socials.facebook}
								<a
									href={socials.facebook}
									target="_blank"
									rel="noopener noreferrer"
									class="text-white/80 transition-colors hover:text-blue-600"
								>
									<span class="sr-only">Facebook</span>
									<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path
											fill-rule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							{/if}
							{#if socials.instagram}
								<a
									href={socials.instagram}
									target="_blank"
									rel="noopener noreferrer"
									class="text-white/80 transition-colors hover:text-pink-600"
								>
									<span class="sr-only">Instagram</span>
									<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path
											fill-rule="evenodd"
											d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm0-2c-2.72 0-3.048.01-4.113.058-1.17.054-1.97.24-2.67.51a6.953 6.953 0 00-2.54 1.654 6.953 6.953 0 00-1.655 2.539c-.27.699-.456 1.5-.51 2.67C.816 8.527.805 8.855.805 11.57v.86c0 2.716.01 3.044.058 4.113.054 1.17.24 1.97.51 2.67a6.953 6.953 0 001.654 2.54 6.953 6.953 0 002.539 1.655c.699.27 1.5.456 2.67.51 1.065.048 1.393.058 4.113.058h.86c2.716 0 3.044-.01 4.113-.058 1.17-.054 1.97-.24 2.67-.51a6.953 6.953 0 002.54-1.654 6.953 6.953 0 001.655-2.539c.27-.699.456-1.5.51-2.67.048-1.065.058-1.393.058-4.113v-.86c0-2.716-.01-3.044-.058-4.113-.054-1.17-.24-1.97-.51-2.67a6.953 6.953 0 00-1.654-2.54 6.953 6.953 0 00-2.539-1.655c-.699-.27-1.5-.456-2.67-.51-1.065-.048-1.393-.058-4.113-.058h-.86zM12.315 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.2a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4zm5.885-6.84a1.08 1.08 0 100 2.16 1.08 1.08 0 000-2.16z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							{/if}
							{#if socials.linkedin}
								<a
									href={socials.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									class="text-white/80 transition-colors hover:text-blue-700"
								>
									<span class="sr-only">LinkedIn</span>
									<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path
											fill-rule="evenodd"
											d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<div>
				<h3 class="mb-4 font-semibold text-white">{t.footer.links}</h3>
				<ul class="space-y-2">
					<li><a href="/{lang}" class="transition-colors hover:text-primary">{t.nav.home}</a></li>
					<li>
						<a href="/{lang}/about" class="transition-colors hover:text-primary">{t.nav.about}</a>
					</li>
					<li>
						<a href="/{lang}/services" class="transition-colors hover:text-primary"
							>{t.nav.services}</a
						>
					</li>
					<li>
						<a href="/{lang}/testimonials" class="transition-colors hover:text-primary"
							>{t.nav.testimonials}</a
						>
					</li>
					<li>
						<a href="/{lang}/contact" class="transition-colors hover:text-primary"
							>{t.nav.contact}</a
						>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="mb-4 font-semibold text-white">{t.footer.legal}</h3>
				<ul class="space-y-2">
					<li>
						<a href="/{lang}/privacy" class="transition-colors hover:text-primary"
							>{t.footer.privacy}</a
						>
					</li>
					<li>
						<a href="/{lang}/terms" class="transition-colors hover:text-primary">{t.footer.terms}</a
						>
					</li>
					<li>
						<a href="/{lang}/disclaimer" class="transition-colors hover:text-primary"
							>{t.footer.disclaimer}</a
						>
					</li>
				</ul>
			</div>

			<!-- Newsletter Section: Full width on mobile (2 cols), 1 col on desktop -->
			<div class="col-span-2 lg:col-span-1">
				<h3 class="mb-4 font-semibold text-white">{t.footer.newsletter.title}</h3>
				<p class="mb-4 text-sm text-white/70">{t.footer.newsletter.description}</p>
				<form onsubmit={subscribe} class="flex flex-col gap-2">
					<div class="relative">
						<input
							type="email"
							bind:value={email}
							required
							placeholder={t.footer.newsletter.placeholder}
							disabled={status === 'loading' || status === 'success'}
							class="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:opacity-50"
						/>
						{#if status === 'success'}
							<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-400">
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						{/if}
					</div>
					<button
						type="submit"
						disabled={status === 'loading' || status === 'success'}
						class="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if status === 'loading'}
							<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
						{:else}
							{t.footer.newsletter.button}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						{/if}
					</button>
					<p class="mt-1 text-xs text-white/40">
						{t.footer.newsletter.disclaimer}
					</p>
				</form>
			</div>
		</div>

		<div class="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/80">
			<p>&copy; {new Date().getFullYear()} {firstName} {lastName}. {t.footer.rights}</p>
			<p class="mt-2 text-xs text-white/70">
				{t.footer.created_by}
				<a
					href="https://ianthoulis.gr"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-primary">{t.footer.developer_name}</a
				>
			</p>
		</div>
	</div>
</footer>
