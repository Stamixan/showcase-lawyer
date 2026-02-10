<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	let {
		yearsExperience = '0+',
		casesWon = '0+',
		successRate = '0%',
		happyClients = '0+',
		labels = {
			years: 'Χρόνια Εμπειρίας',
			cases: 'Επιτυχημένες Υποθέσεις',
			rate: 'Ποσοστό Επιτυχίας',
			clients: 'Ικανοποιημένοι Πελάτες'
		}
	} = $props();
</script>

<section class="border-t border-primary/20 bg-secondary py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
			<div use:reveal={{ delay: 0 }}>
				<div class="font-serif text-4xl font-bold text-primary">{yearsExperience}</div>
				<div class="mt-2 text-white/80">{labels.years}</div>
			</div>
			<div use:reveal={{ delay: 100 }}>
				<div class="font-serif text-4xl font-bold text-primary">{casesWon}</div>
				<div class="mt-2 text-white/80">{labels.cases}</div>
			</div>
			<div use:reveal={{ delay: 200 }}>
				<div class="font-serif text-4xl font-bold text-primary">{successRate}</div>
				<div class="mt-2 text-white/80">{labels.rate}</div>
			</div>
			<div use:reveal={{ delay: 300 }}>
				<div class="font-serif text-4xl font-bold text-primary">{happyClients}</div>
				<div class="mt-2 text-white/80">{labels.clients}</div>
			</div>
		</div>
	</div>
</section>
