<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';

	let { children } = $props();

	let password = $state('');
	let isAuthenticated = $state(false);
	let isLoading = $state(true); // Start loading to check localStorage
	let error = $state('');

	onMount(async () => {
		const saved = localStorage.getItem('admin_password');
		if (saved) {
			password = saved;
			await handleLogin();
		} else {
			isLoading = false;
		}
	});

	async function handleLogin(e?: Event) {
		if (e) e.preventDefault();
		isLoading = true;
		error = '';

		try {
			// Validate password by trying to fetch inquiries
			// This is a simple auth check.
			await convex.mutation(api.inquiries.list, { password });
			isAuthenticated = true;
			localStorage.setItem('admin_password', password);
		} catch (err: any) {
			console.error(err);
			error = 'Λάθος συνθηματικό.';
			isAuthenticated = false;
			localStorage.removeItem('admin_password');
		} finally {
			isLoading = false;
		}
	}

	function handleLogout() {
		isAuthenticated = false;
		password = '';
		localStorage.removeItem('admin_password');
		goto('/admin');
	}
</script>

<div class="flex min-h-screen bg-slate-50 font-sans">
	{#if !isAuthenticated && !isLoading}
		<!-- Login Screen -->
		<div class="flex flex-1 items-center justify-center p-4">
			<div class="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
				<div class="mb-6 flex justify-center">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6 text-slate-900"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
					</div>
				</div>
				<h2 class="mb-6 text-center text-xl font-bold text-slate-900">Είσοδος Διαχειριστή</h2>
				<form onsubmit={handleLogin} class="space-y-4">
					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700" for="password"
							>Συνθηματικό</label
						>
						<input
							type="password"
							id="password"
							bind:value={password}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-3 transition outline-none focus:ring-2 focus:ring-slate-900"
							placeholder="Εισάγετε τον κωδικό..."
						/>
					</div>
					{#if error}
						<p class="text-sm text-red-500">{error}</p>
					{/if}
					<button
						type="submit"
						disabled={isLoading}
						class="w-full rounded-lg bg-slate-900 py-3 font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
					>
						{isLoading ? 'Έλεγχος...' : 'Είσοδος'}
					</button>
				</form>
				<div class="mt-6 text-center">
					<a
						href="/"
						class="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
					>
						Επιστροφή στο Site
					</a>
				</div>
			</div>
		</div>
	{:else if isAuthenticated}
		<!-- Sidebar Navigation -->
		<aside class="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
			<div class="flex h-16 items-center border-b border-slate-100 px-6 font-bold text-slate-900">
				Admin Panel
			</div>
			<nav class="flex-1 space-y-1 p-4">
				<a
					href="/admin/messages"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname.includes(
						'/admin/messages'
					)
						? 'bg-slate-100 text-slate-900'
						: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
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
							d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
						/>
					</svg>
					Μηνύματα
				</a>
			</nav>
			<div class="border-t border-slate-200 p-4">
				<button
					onclick={handleLogout}
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
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
							d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
						/>
					</svg>
					Αποσύνδεση
				</button>
			</div>
		</aside>

		<!-- Mobile Header (Visible only on mobile) -->
		<div class="flex flex-1 flex-col md:hidden">
			<header
				class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4"
			>
				<div class="font-bold text-slate-900">Admin Panel</div>
				<div class="flex gap-4">
					<a href="/admin/messages" class="text-slate-600 hover:text-slate-900">Msg</a>
					<button onclick={handleLogout} class="text-slate-600 hover:text-slate-900">Out</button>
				</div>
			</header>
			<main class="flex-1 overflow-hidden">
				{@render children()}
			</main>
		</div>

		<!-- Desktop Main Content -->
		<main class="hidden flex-1 flex-col overflow-hidden md:flex">
			{@render children()}
		</main>
	{/if}
</div>
