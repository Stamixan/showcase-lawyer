<script lang="ts">
	import { page } from '$app/stores';
	import FlagUK from '$lib/components/icons/FlagUK.svelte';
	import FlagGR from '$lib/components/icons/FlagGR.svelte';
	import Menu from '$lib/components/icons/Menu.svelte';

	let { firstName = '', lastName = '', lang = 'el', t } = $props();

	let isMobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	// Helper to switch language in current URL
	function getSwitchLangUrl() {
		const currentPath = $page.url.pathname;
		const segments = currentPath.split('/');
		// segments[0] is empty, segments[1] is 'el' or 'en'
		if (segments[1] === 'el') segments[1] = 'en';
		else if (segments[1] === 'en') segments[1] = 'el';
		// If we are at root /, default to target lang
		else return lang === 'el' ? '/en' : '/el';
		return segments.join('/');
	}

	let navLinks = $derived([
		{ href: `/${lang}`, label: t.nav.home },
		{ href: `/${lang}/about`, label: t.nav.about },
		{ href: `/${lang}/services`, label: t.nav.services },
		{ href: `/${lang}/testimonials`, label: t.nav.testimonials },
		{ href: `/${lang}/contact`, label: t.nav.contact, isCta: true }
	]);
</script>

<nav class="fixed z-50 w-full border-b border-primary/20 bg-secondary md:bg-secondary/95 md:backdrop-blur-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<div class="flex items-center">
				<a href="/{lang}" class="font-serif text-2xl font-bold text-white">
					<span class="text-primary">{firstName.charAt(0)}. {lastName}</span>
				</a>
			</div>

			<div class="hidden items-center space-x-8 md:flex">
				{#each navLinks as link}
					{#if link.isCta}
						<a
							href={link.href}
							class="rounded-md bg-primary px-6 py-2 text-white transition-colors hover:brightness-110"
						>
							{link.label}
						</a>
					{:else}
						<a
							href={link.href}
							class="transition-colors hover:text-primary {$page.url.pathname === link.href ||
							($page.url.pathname === '/' && link.href === '/el')
								? 'font-medium text-primary'
								: 'text-white/90'}"
						>
							{link.label}
						</a>
					{/if}
				{/each}

				<!-- Language Switcher -->
				<a
					href={getSwitchLangUrl()}
					class="ml-4 flex items-center justify-center border border-white/10 transition-colors hover:border-primary hover:bg-white/5"
					title={lang === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
					aria-label={lang === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
				>
					{#if lang === 'el'}
						<FlagUK class="h-6 w-8 object-cover" />
					{:else}
						<FlagGR class="h-6 w-8 object-cover" />
					{/if}
				</a>
			</div>

			<button onclick={toggleMobileMenu} class="text-white md:hidden" aria-label="Menu">
				<Menu />
			</button>
		</div>
	</div>
	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div class="border-t border-white/10 bg-secondary md:hidden">
			<div class="space-y-3 px-4 py-4">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block {link.isCta
							? 'font-medium text-primary'
							: $page.url.pathname === link.href
								? 'font-medium text-primary'
								: 'text-white/90 hover:text-primary'}"
						onclick={() => (isMobileMenuOpen = false)}
					>
						{link.label}
					</a>
				{/each}
				<a
					href={getSwitchLangUrl()}
					class="mt-4 flex items-center border-t border-white/10 pt-4 text-white/60 hover:text-white"
					aria-label={lang === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
				>
					{#if lang === 'el'}
						<FlagUK class="mr-3 h-5 w-5 object-cover" />
						Switch to English
					{:else}
						<FlagGR class="mr-3 h-5 w-5 object-cover" />
						Αλλαγή σε Ελληνικά
					{/if}
				</a>
			</div>
		</div>
	{/if}
</nav>
