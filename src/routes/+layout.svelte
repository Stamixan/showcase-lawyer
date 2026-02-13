<script lang="ts">
	import './layout.css';
	import { Toaster } from 'svelte-sonner';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { themePresets } from '$lib/data/firm';

	let { children, data } = $props();

	// Initialize with server-provided default, then hydrate from LS
	let theme = $state(data.theme);

	// Update theme if server data changes (e.g. navigation)
	$effect(() => {
		theme = data.theme;
	});

	onMount(() => {
		const stored = localStorage.getItem('theme-preset');
		if (stored && themePresets[stored]) {
			theme = themePresets[stored];
		}
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Dynamic Favicon Generation
	// We construct the SVG string on the fly, replacing the fill color with the theme's primary color.
	const faviconSvg = $derived(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="${theme.colors.primary.replace('#', '%23')}" d="M384 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L398.4 160C393.2 185.8 375.5 207.1 352 217.3L352 512L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L128 576C110.3 576 96 561.7 96 544C96 526.3 110.3 512 128 512L288 512L288 217.3C264.5 207 246.8 185.7 241.6 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L256 96C270.6 76.6 293.8 64 320 64C346.2 64 369.4 76.6 384 96zM439.6 384L584.4 384L512 259.8L439.6 384zM512 480C449.1 480 396.8 446 386 401.1C383.4 390.1 387 378.8 392.7 369L487.9 205.8C492.9 197.2 502.1 192 512 192C521.9 192 531.1 197.3 536.1 205.8L631.3 369C637 378.8 640.6 390.1 638 401.1C627.2 445.9 574.9 480 512 480zM126.8 259.8L54.4 384L199.3 384L126.8 259.8zM.9 401.1C-1.7 390.1 1.9 378.8 7.6 369L102.8 205.8C107.8 197.2 117 192 126.9 192C136.8 192 146 197.3 151 205.8L246.2 369C251.9 378.8 255.5 390.1 252.9 401.1C242.1 445.9 189.8 480 126.9 480C64 480 11.7 446 .9 401.1z" /></svg>`
	);
	const faviconDataUri = $derived(`data:image/svg+xml,${faviconSvg}`);

	// Load configuration
	const headingFontFamily = $derived(theme.fonts.heading.split(':')[0].replace(/\+/g, ' '));
	const bodyFontFamily = $derived(theme.fonts.body.split(':')[0].replace(/\+/g, ' '));

	const cssVariables = $derived(
		[
			`--color-primary: ${theme.colors.primary}`,
			`--color-secondary: ${theme.colors.secondary}`,
			`--color-accent: ${theme.colors.accent}`,
			`--color-text: ${theme.colors.text}`,
			`--color-heading: ${theme.colors.heading}`,
			`--color-background: ${theme.colors.background}`,
			`--font-heading: '${headingFontFamily}', serif`,
			`--font-body: '${bodyFontFamily}', sans-serif`,
			`--radius: ${theme.borderRadius}`
		].join(';')
	);
</script>

<svelte:head>
	<link rel="icon" href={faviconDataUri} />
	<!-- Dynamic Font Loading -->
	{#if theme.fonts.heading !== 'Outfit:wght@400;700' || theme.fonts.body !== 'DM+Sans:wght@400;500'}
		<link
			rel="preload"
			as="style"
			href="https://fonts.googleapis.com/css2?family={theme.fonts.heading}&family={theme.fonts
				.body}&display=swap"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family={theme.fonts.heading}&family={theme.fonts
				.body}&display=swap"
			rel="stylesheet"
			media="print"
			onload={(e) => ((e.currentTarget as HTMLLinkElement).media = 'all')}
		/>
	{/if}
</svelte:head>

<div style={cssVariables} class="contents">
	<Toaster position="top-center" richColors />
	{@render children()}
</div>
