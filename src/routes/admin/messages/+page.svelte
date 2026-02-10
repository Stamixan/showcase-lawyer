<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { toast } from 'svelte-sonner';
	import Markdown from '$lib/components/Markdown.svelte';

	let inquiries = $state<any[]>([]);
	let isLoading = $state(false);
	let password = $state(''); // Will be read from localStorage

	// Master-Detail State
	let selectedId = $state<string | null>(null);
	let selectedInquiry = $derived(inquiries.find((i) => i._id === selectedId));

	onMount(() => {
		const saved = localStorage.getItem('admin_password');
		if (saved) {
			password = saved;
			loadInquiries();
		}
	});

	async function loadInquiries() {
		isLoading = true;
		try {
			const result = await convex.mutation(api.inquiries.list, { password });
			inquiries = result;
		} catch (err: any) {
			toast.error('Could not load inquiries. Auth error?');
		} finally {
			isLoading = false;
		}
	}

	// Refresh function exposed to UI
	function handleRefresh() {
		loadInquiries();
	}

	async function selectInquiry(inquiry: any) {
		selectedId = inquiry._id;

		// Auto-mark as read if it's currently unread
		if (!inquiry.isRead) {
			try {
				// Optimistic update
				const index = inquiries.findIndex((i) => i._id === inquiry._id);
				if (index !== -1) {
					inquiries[index].isRead = true;
				}

				await convex.mutation(api.inquiries.updateStatus, {
					id: inquiry._id,
					isRead: true,
					password
				});
			} catch (err) {
				console.error(err);
			}
		}
	}

	async function toggleUnread() {
		if (!selectedInquiry) return;
		const newStatus = !selectedInquiry.isRead;
		const id = selectedInquiry._id;

		try {
			// Optimistic
			const index = inquiries.findIndex((i) => i._id === id);
			if (index !== -1) inquiries[index].isRead = newStatus;

			await convex.mutation(api.inquiries.updateStatus, {
				id,
				isRead: newStatus,
				password
			});
			toast.success(newStatus ? 'Σημειώθηκε ως διαβασμένο' : 'Σημειώθηκε ως αδιάβαστο');
		} catch (err) {
			console.error(err);
			toast.error('Σφάλμα ενημέρωσης');
		}
	}

	async function handleDelete() {
		if (!selectedInquiry) return;
		if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το μήνυμα;')) return;

		const id = selectedInquiry._id;
		try {
			await convex.mutation(api.inquiries.deleteInquiry, { id, password });
			// Optimistic update
			inquiries = inquiries.filter((i) => i._id !== id);
			if (selectedId === id) selectedId = null;
			toast.success('Το μήνυμα διαγράφηκε');
		} catch (err) {
			console.error(err);
			toast.error('Σφάλμα διαγραφής');
		}
	}

	function formatDate(timestamp: number) {
		return new Date(timestamp).toLocaleString('el-GR', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="flex h-[calc(100vh-4rem)] flex-col bg-slate-50 font-sans md:h-screen md:flex-row">
	<!-- Sidebar (Message List) -->
	<!-- Mobile: Hidden if selectedId is present. Desktop: Always visible -->
	<div
		class="{selectedId
			? 'hidden'
			: 'flex'} w-full flex-col border-r border-slate-200 bg-white md:flex md:w-96"
	>
		<div
			class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-100 bg-white px-4 shadow-sm"
		>
			<h1 class="font-serif text-xl font-bold text-slate-900">Εισερχόμενα</h1>
			<button
				onclick={handleRefresh}
				title="Ανανέωση"
				disabled={isLoading}
				class="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5 {isLoading ? 'animate-spin' : ''}"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
			</button>
		</div>

		<div class="flex-1 overflow-y-auto">
			{#if inquiries.length === 0}
				{#if isLoading}
					<div class="p-8 text-center text-slate-500">Φόρτωση...</div>
				{:else}
					<div class="p-8 text-center text-slate-500">Δεν υπάρχουν μηνύματα.</div>
				{/if}
			{:else}
				{#each inquiries as inquiry}
					<button
						onclick={() => selectInquiry(inquiry)}
						class="w-full border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 {selectedId ===
						inquiry._id
							? 'bg-primary/5 hover:bg-primary/5'
							: ''}"
					>
						<div class="mb-1 flex justify-between">
							<span
								class="text-sm font-semibold {inquiry.isRead ? 'text-slate-900' : 'text-primary'}"
							>
								{inquiry.firstName}
								{inquiry.lastName}
							</span>
							<span class="text-xs text-slate-500">{formatDate(inquiry._creationTime)}</span>
						</div>
						<div class="mb-1 text-sm font-medium text-slate-700">{inquiry.topic}</div>
						<div class="line-clamp-2 text-xs text-slate-500">
							{inquiry.message}
						</div>
						{#if !inquiry.isRead}
							<div class="mt-2 flex items-center gap-1.5">
								<span class="h-2 w-2 rounded-full bg-primary"></span>
								<span class="text-xs font-medium text-primary">Νέο</span>
							</div>
						{/if}
					</button>
				{/each}
			{/if}
		</div>
	</div>

	<!-- Detail View -->
	<!-- Mobile: Visible only if selectedId is present. Desktop: Always visible (takes remaining width) -->
	<div
		class="{selectedId
			? 'flex'
			: 'hidden'} relative h-full flex-1 flex-col overflow-hidden bg-slate-50 md:flex"
	>
		{#if selectedInquiry}
			<!-- Header / Toolbar -->
			<div class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
				<div class="flex items-center gap-3">
					<button
						onclick={() => (selectedId = null)}
						class="mr-2 rounded-full p-1 text-slate-500 hover:bg-slate-100 md:hidden"
						aria-label="Back to list"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
							/>
						</svg>
					</button>
					<div class="flex gap-2">
						<button
							onclick={handleDelete}
							class="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
							title="Διαγραφή (Αρχειοθέτηση)"
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
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</button>
						<button
							onclick={toggleUnread}
							class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-primary"
							title={selectedInquiry.isRead
								? 'Σήμανση ως μη αναγνωσμένο'
								: 'Σήμανση ως αναγνωσμένο'}
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
						</button>
					</div>
				</div>
				<div class="hidden items-center gap-4 md:flex">
					<span class="text-xs text-slate-400">
						{formatDate(selectedInquiry._creationTime)}
					</span>
				</div>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto p-6 md:p-10">
				<div class="mx-auto max-w-3xl">
					<div class="mb-8 border-b border-slate-200 pb-8">
						<h2 class="mb-2 text-2xl font-bold text-slate-900">
							{selectedInquiry.topic}
						</h2>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-lg font-bold text-slate-600"
								>
									{selectedInquiry.firstName[0]}{selectedInquiry.lastName[0]}
								</div>
								<div>
									<div class="font-bold text-slate-900">
										{selectedInquiry.firstName}
										{selectedInquiry.lastName}
									</div>
									<div class="flex gap-4 text-sm text-slate-500">
										<a href="mailto:{selectedInquiry.email}" class="hover:underline"
											>{selectedInquiry.email}</a
										>
										<span>•</span>
										<a href="tel:{selectedInquiry.phone}" class="hover:underline"
											>{selectedInquiry.phone || 'N/A'}</a
										>
									</div>
								</div>
							</div>
						</div>
					</div>

					{#if selectedInquiry.summary}
						<div
							class="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-primary shadow-sm"
						>
							<div class="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="h-4 w-4"
								>
									<path
										fill-rule="evenodd"
										d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM9 15v5.25a.75.75 0 0 1-1.5 0V15a.75.75 0 0 1 1.5 0ZM7.5 7.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM19.5 15v5.25a.75.75 0 0 1-1.5 0V15a.75.75 0 0 1 1.5 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								AI Summary
							</div>
							<div class="mb-4 text-slate-700">{selectedInquiry.summary}</div>

							{#if selectedInquiry.scamRisk || selectedInquiry.urgency || selectedInquiry.profitability}
								<div class="grid grid-cols-3 gap-4 border-t border-primary/20 pt-4">
									<!-- Scam Risk -->
									<div
										class="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center"
									>
										<div class="text-xs font-bold text-slate-500 uppercase">Risk</div>
										<div
											class="text-xl font-black {selectedInquiry.scamRisk > 3
												? 'text-red-500'
												: 'text-green-500'}"
										>
											{selectedInquiry.scamRisk}/5
										</div>
									</div>

									<!-- Urgency -->
									<div
										class="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center"
									>
										<div class="text-xs font-bold text-slate-500 uppercase">Urgency</div>
										<div
											class="text-xl font-black {selectedInquiry.urgency > 3
												? 'text-orange-500'
												: 'text-slate-700'}"
										>
											{selectedInquiry.urgency}/5
										</div>
									</div>

									<!-- Profitability -->
									<div
										class="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center"
									>
										<div class="text-xs font-bold text-slate-500 uppercase">Value</div>
										<div class="text-xl font-black text-amber-500">
											{selectedInquiry.profitability}/5
										</div>
									</div>
								</div>
							{/if}
						</div>
					{:else if selectedInquiry.scamRisk}
						<!-- Fallback if only metrics exist but no summary text (rare) -->
						<div
							class="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-primary shadow-sm"
						>
							<div class="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
								AI Analysis
							</div>
							<div class="grid grid-cols-3 gap-4 border-t border-primary/20 pt-4">
								<div class="flex flex-col items-center rounded-lg bg-white p-2 text-center">
									<div class="text-xs font-bold text-slate-500 uppercase">Risk</div>
									<div
										class="text-xl font-black {selectedInquiry.scamRisk > 3
											? 'text-red-500'
											: 'text-green-500'}"
									>
										{selectedInquiry.scamRisk}/5
									</div>
								</div>
								<div class="flex flex-col items-center rounded-lg bg-white p-2 text-center">
									<div class="text-xs font-bold text-slate-500 uppercase">Urgency</div>
									<div
										class="text-xl font-black {selectedInquiry.urgency > 3
											? 'text-orange-500'
											: 'text-slate-700'}"
									>
										{selectedInquiry.urgency}/5
									</div>
								</div>
								<div class="flex flex-col items-center rounded-lg bg-white p-2 text-center">
									<div class="text-xs font-bold text-slate-500 uppercase">Value</div>
									<div class="text-xl font-black text-amber-500">
										{selectedInquiry.profitability}/5
									</div>
								</div>
							</div>
						</div>
					{/if}

					<div class="text-lg leading-relaxed text-slate-800">
						<Markdown content={selectedInquiry.message} />
					</div>
				</div>
			</div>
		{:else}
			<!-- Empty State (Desktop) -->
			<div class="flex h-full flex-col items-center justify-center p-8 text-slate-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mb-4 h-16 w-16 opacity-50"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
					/>
				</svg>
				<p class="text-lg font-medium">Επιλέξτε ένα μήνυμα για ανάγνωση</p>
			</div>
		{/if}
	</div>
</div>
