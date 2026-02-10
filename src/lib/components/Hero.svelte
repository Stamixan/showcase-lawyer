<script lang="ts">
	let {
		firstName = '',
		lastName = '',
		title = '',
		description = '',
		ui = {
			bookAppointment: 'Κλείστε Ραντεβού',
			learnMore: 'Μάθετε Περισσότερα'
		},
		lang = 'el'
	} = $props();
</script>

<section id="home" class="relative flex min-h-screen items-center overflow-hidden">
	<!-- Cinematic Background Layer (Using picture for better LCP and performance) -->
	<picture class="absolute inset-0 -z-10 h-full w-full">
		<source media="(max-width: 768px)" srcset="/justice-mobile.webp" />
		<img
			src="/justice.webp"
			alt="Justice Background"
			width="1920"
			height="1080"
			class="hero-img h-full w-full object-cover"
			fetchpriority="high"
			loading="eager"
			decoding="async"
		/>
	</picture>

	<!-- Overlay Gradient (Static) -->
	<div
		class="absolute inset-0 -z-10 bg-linear-to-br from-slate-900/95 via-slate-900/80 to-slate-900/70"
	></div>
	<div class="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
		<div class="max-w-3xl">
			<div class="mb-6 flex items-center">
				<div class="mr-4 h-0.5 w-16 bg-primary"></div>
				<span class="text-sm font-medium tracking-wider text-primary uppercase">{title}</span>
			</div>
			<h1 class="mb-6 font-serif text-5xl leading-tight font-bold text-white md:text-7xl">
				<span class="text-slate">{firstName}</span><br />
				<span class="text-slate">{lastName}</span>
			</h1>
			<p class="mb-8 max-w-2xl text-xl leading-relaxed text-white/80">
				{description}
			</p>
			<div class="flex flex-col gap-4 sm:flex-row">
				<a
					href="/{lang}/contact"
					class="transform rounded-md bg-primary px-8 py-4 text-center font-medium text-white transition-all hover:scale-105 hover:brightness-110"
				>
					{ui.bookAppointment}
				</a>
				<a
					href="/{lang}/about"
					class="rounded-md border border-white/30 px-8 py-4 text-center font-medium text-white transition-all hover:border-primary hover:bg-white/5"
				>
					{ui.learnMore}
				</a>
			</div>
		</div>
	</div>
</section>
