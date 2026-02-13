<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { convex } from '$lib/convex';
	import Facebook from '$lib/components/icons/Facebook.svelte';
	import Instagram from '$lib/components/icons/Instagram.svelte';
	import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
	import PaperPlane from '$lib/components/icons/PaperPlane.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import Check from '$lib/components/icons/Check.svelte';

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
									<Facebook />
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
									<Instagram />
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
									<LinkedIn />
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
							aria-label={t.footer.newsletter.title}
							placeholder={t.footer.newsletter.placeholder}
							disabled={status === 'loading' || status === 'success'}
							class="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:opacity-50"
						/>
						{#if status === 'success'}
							<div class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
								<Check />
							</div>
						{/if}
					</div>
					<button
						type="submit"
						disabled={status === 'loading' || status === 'success'}
						class="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if status === 'loading'}
							<Spinner />
						{:else}
							{t.footer.newsletter.button}
							<PaperPlane />
						{/if}
					</button>
					<div class="sr-only" aria-live="polite">
						{#if status === 'success'}
							{t.footer.newsletter.success}
						{:else}
							{status}
						{/if}
					</div>
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
