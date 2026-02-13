<script lang="ts">
	import { countUp } from '$lib/actions/countUp';
	import { reveal } from '$lib/actions/reveal';
	let {
		yearsExperience = '0+',
		casesWon = '0+',
		successRate = '0%',
		happyClients = '0+',
		labels = {
			years: '',
			cases: '',
			rate: '',
			clients: ''
		}
	} = $props();
</script>

<section class="border-t border-primary/20 bg-secondary py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 text-center md:grid-cols-3">
			<div use:reveal={{ delay: 0 }}>
				<div
					class="font-serif text-4xl font-bold text-primary"
					use:countUp={{ value: yearsExperience, duration: 2000 }}
				>
					0
				</div>
				<div class="mt-2 text-white/90">{labels.years}</div>
			</div>
			<div use:reveal={{ delay: 100 }}>
				<div
					class="font-serif text-4xl font-bold text-primary"
					use:countUp={{ value: casesWon, duration: 2500 }}
				>
					0
				</div>
				<div class="mt-2 text-white/90">{labels.cases}</div>
			</div>
			<!-- Nuked Success Rate for testing -->
			<!--
			<div use:reveal={{ delay: 200 }}>
				<div
					class="font-serif text-4xl font-bold text-primary"
					use:countUp={{ value: successRate, duration: 2000 }}
				>
					0%
				</div>
				<div class="mt-2 text-white/90">{labels.rate}</div>
			</div>
			-->
			<div use:reveal={{ delay: 300 }}>
				<div
					class="font-serif text-4xl font-bold text-primary"
					use:countUp={{ value: happyClients, duration: 2500 }}
				>
					0
				</div>
				<div class="mt-2 text-white/90">{labels.clients}</div>
			</div>
		</div>
	</div>
</section>
