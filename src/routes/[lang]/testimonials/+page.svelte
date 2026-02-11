<script lang="ts">
	import Testimonials from '$lib/components/Testimonials.svelte';

	let { data } = $props();
	let firmData = $derived(data.firmData);
</script>

<Testimonials testimonials={firmData.testimonials} labels={data.t.testimonials} />
