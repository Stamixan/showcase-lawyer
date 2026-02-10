<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/admin/messages');
	});
</script>

<div class="flex h-full items-center justify-center text-slate-400">Loading...</div>
