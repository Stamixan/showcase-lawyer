<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	interface Testimonial {
		quote: string;
		author: string;
		role: string;
		initials: string;
	}

	let { testimonials = [] as Testimonial[] } = $props();
</script>

<section id="testimonials" class="relative overflow-hidden bg-surface-dark py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center" use:reveal={{ delay: 0 }}>
			<div class="mb-4 flex items-center justify-center">
				<div class="mr-4 h-0.5 w-12 bg-primary"></div>
				<span class="text-sm font-medium tracking-wider text-primary uppercase">Μαρτυρίες</span>
				<div class="ml-4 h-0.5 w-12 bg-primary"></div>
			</div>
			<h2 class="mb-4 font-serif text-4xl font-bold text-content-inv-p md:text-5xl">
				Τι λένε οι πελάτες μας
			</h2>
		</div>
		<div class="grid gap-8 md:grid-cols-3">
			{#each testimonials as testimonial, i}
				<div
					class="relative rounded-lg border-t-4 border-primary bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl"
					use:reveal={{ delay: i * 150 }}
				>
					<div class="absolute top-4 left-6 font-serif text-6xl text-primary opacity-20">"</div>
					<p class="relative z-10 mb-6 leading-relaxed text-slate-600">
						{testimonial.quote}
					</p>
					<div class="flex items-center">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white shadow-md"
						>
							{testimonial.initials}
						</div>
						<div class="ml-4">
							<div class="font-medium text-slate-900">{testimonial.author}</div>
							<div class="text-sm text-slate-500">{testimonial.role}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
