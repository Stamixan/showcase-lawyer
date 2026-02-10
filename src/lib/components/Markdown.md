# Markdown Component Configuration

The `Markdown.svelte` component uses:

- **marked**: A fast markdown parser.
- **isomorphic-dompurify**: A DOM-only, super-fast, ubber-tolerant XSS sanitizer for HTML, enabling safe rendering of user/data content.

## Usage

```svelte
<script>
	import Markdown from '$lib/components/Markdown.svelte';
	const content = '**Hello** _world_!';
</script>

<Markdown {content} />
```

## Styling

We use the `prose` class from `@tailwindcss/typography` to style the rendered HTML. Ensure this plugin is added to `tailwind.config.js` or `index.css` if not already present, or add custom CSS for `.prose h1`, `.prose p`, etc.
