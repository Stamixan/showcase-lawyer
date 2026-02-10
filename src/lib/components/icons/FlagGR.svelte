<script>
	let { class: className = 'h-6 w-6' } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 600 400"
	class={className}
	aria-hidden="true"
	preserveAspectRatio="xMidYMid slice"
>
	<rect width="600" height="400" fill="#fff" />
	<rect width="600" height="400" fill="#005bae" mask="url(#m)" />
	<mask id="m">
		<path fill="#fff" d="M0 0h600v400H0z" />
		<path
			fill="#000"
			d="M0 40h600v40H0zM0 120h600v40H0zM0 200h600v40H0zM0 280h600v40H0zM0 360h600v40H0z"
		/>
		<path fill="#000" d="M0 0h200v200H0z" />
	</mask>
	<path fill="#005bae" d="M0 0h200v200H0z" />
	<path fill="#fff" d="M80 0h40v200H80zM0 80h200v40H0z" />
</svg>
