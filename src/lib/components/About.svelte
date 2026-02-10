<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Markdown from '$lib/components/Markdown.svelte';
	let {
		yearsExperience = '10',
		profileImage = '',
		aboutText = '',
		aboutHtml = '',
		firstName = '',
		lastName = '',
		ui = {
			aboutMe: 'Σχετικά με Εμένα',
			aboutTitle: 'Σύγχρονη Νομική Προσέγγιση',
			excellence: 'Χρόνια Εμπειρίας',
			memberBar: 'Μέλος Δικηγορικού Συλλόγου Αθηνών',
			appealCourt: "Δικηγόρος παρ' Εφέταις",
			fluentEnglish: 'Άριστη γνώση Αγγλικών',
			modernApproach: 'Εξειδίκευση στην Καινοτομία'
		}
	} = $props();
</script>

<section id="about" class="bg-background py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-16 md:grid-cols-2">
			<div class="relative" use:reveal={{ delay: 0 }}>
				<div class="absolute -top-4 -left-4 h-72 w-72 rounded-lg bg-primary/10"></div>
				<img
					src={profileImage}
					alt="{firstName} {lastName}"
					width="600"
					height="750"
					loading="lazy"
					class="relative mx-auto w-full max-w-md rounded-lg shadow-2xl"
				/>
			</div>
			<div use:reveal={{ delay: 200 }}>
				<div class="mb-4 flex items-center">
					<div class="mr-4 h-0.5 w-12 bg-primary"></div>
					<span class="text-sm font-medium tracking-wider text-accent uppercase">{ui.aboutMe}</span>
				</div>
				<h2 class="mb-6 font-serif text-4xl font-bold text-content-p md:text-5xl">
					{ui.aboutTitle}
				</h2>
				<Markdown content={aboutText} html={aboutHtml} />
				<div class="mt-8 grid grid-cols-2 gap-6">
					<div class="flex items-start">
						<svg
							class="mt-1 mr-3 h-6 w-6 shrink-0 text-primary"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-content-s">{ui.memberBar}</span>
					</div>
					<div class="flex items-start">
						<svg
							class="mt-1 mr-3 h-6 w-6 shrink-0 text-primary"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-content-s">{ui.appealCourt}</span>
					</div>
					<div class="flex items-start">
						<svg
							class="mt-1 mr-3 h-6 w-6 shrink-0 text-primary"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-content-s">{ui.fluentEnglish}</span>
					</div>
					<div class="flex items-start">
						<svg
							class="mt-1 mr-3 h-6 w-6 shrink-0 text-primary"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="text-content-s">{ui.modernApproach}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
