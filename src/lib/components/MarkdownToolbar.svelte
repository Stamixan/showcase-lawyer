<script lang="ts">
	let { textarea = undefined, value = $bindable() } = $props<{
		textarea?: HTMLTextAreaElement;
		value: string;
	}>();

	let toolbarEl = $state<HTMLDivElement>();
	let showToolbar = $state(false);
	let toolbarPos = $state({ top: 0, left: 0 });
	let selectionRange = $state({ start: 0, end: 0 });

	$effect(() => {
		if (textarea) {
			document.addEventListener('selectionchange', handleGlobalSelectionChange);
			window.addEventListener('resize', updateToolbarPosition);

			return () => {
				document.removeEventListener('selectionchange', handleGlobalSelectionChange);
				window.removeEventListener('resize', updateToolbarPosition);
			};
		}
	});

	function handleGlobalSelectionChange() {
		// Only react if our textarea is the active element
		if (document.activeElement === textarea) {
			updateToolbarPosition();
		} else {
			showToolbar = false;
		}
	}

	function getCaretCoordinates(element: HTMLTextAreaElement, position: number) {
		const div = document.createElement('div');
		const style = window.getComputedStyle(element);

		const properties = [
			'direction',
			'boxSizing',
			'width',
			'height',
			'overflowX',
			'overflowY',
			'borderTopWidth',
			'borderRightWidth',
			'borderBottomWidth',
			'borderLeftWidth',
			'paddingTop',
			'paddingRight',
			'paddingBottom',
			'paddingLeft',
			'fontStyle',
			'fontVariant',
			'fontWeight',
			'fontStretch',
			'fontSize',
			'fontSizeAdjust',
			'lineHeight',
			'fontFamily',
			'textAlign',
			'textTransform',
			'textIndent',
			'textDecoration',
			'letterSpacing',
			'wordSpacing',
			'tabSize',
			'MozTabSize'
		];

		properties.forEach((prop) => {
			div.style.setProperty(prop, style.getPropertyValue(prop));
		});

		div.style.position = 'absolute';
		div.style.visibility = 'hidden';
		div.style.whiteSpace = 'pre-wrap';
		div.style.overflowWrap = 'break-word';
		div.style.top = '0';
		div.style.left = '0';
		div.style.width = style.width;

		div.textContent = element.value.substring(0, position);

		const span = document.createElement('span');
		span.textContent = element.value.substring(position) || '.';
		div.appendChild(span);

		document.body.appendChild(div);

		const relativeTop = span.offsetTop + (parseInt(style.borderTopWidth) || 0);
		const relativeLeft = span.offsetLeft + (parseInt(style.borderLeftWidth) || 0);

		document.body.removeChild(div);

		return { top: relativeTop, left: relativeLeft };
	}

	function updateToolbarPosition() {
		if (!textarea) return;

		requestAnimationFrame(() => {
			if (!textarea) return;

			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;

			if (start === end) {
				showToolbar = false;
				return;
			}

			// We have a selection
			selectionRange = { start, end };

			const coordsStart = getCaretCoordinates(textarea, start);
			const coordsEnd = getCaretCoordinates(textarea, end);

			const textareaRect = textarea.getBoundingClientRect();

			// Calculate the "visual" top and left relative to the viewport
			// Textarea scroll position matters!
			const scrollTop = textarea.scrollTop;
			const scrollLeft = textarea.scrollLeft;

			const topOffset = coordsStart.top - scrollTop;
			// Align with the START of the selection (caret position)
			const leftOffset = coordsStart.left - scrollLeft;

			// Final screen coordinates
			let top = textareaRect.top + topOffset - 40;
			let left = textareaRect.left + leftOffset;

			// Safety checks
			if (isNaN(top)) top = textareaRect.top - 35;
			if (isNaN(left)) left = textareaRect.left;

			// Boundary checks (keep within viewport roughly)
			if (top < 10) top = textareaRect.top + topOffset + 30;

			// Center the toolbar
			if (toolbarEl) {
				const toolbarRect = toolbarEl.getBoundingClientRect();
				// Do NOT subtract width/2 (User wants it aligned with selection start, not centered)

				// Dynamic top positioning based on toolbar height
				// Position it exactly above the line with a small gap (4px)
				top = textareaRect.top + topOffset - toolbarRect.height + 4;

				// X-axis boundary check
				if (left < 10) left = 10;
				if (left + toolbarRect.width > window.innerWidth - 10)
					left = window.innerWidth - toolbarRect.width - 10;
			}

			toolbarPos = { top, left };
			showToolbar = true;
		});
	}

	function insertMarkdown(prefix: string, suffix: string = '') {
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = textarea.value;

		const before = text.substring(0, start);
		const selection = text.substring(start, end);
		const after = text.substring(end);

		const newText = before + prefix + selection + suffix + after;

		value = newText;

		// Restore focus and cursor
		requestAnimationFrame(() => {
			if (textarea) {
				textarea.focus();
				const newCursorPos = start + prefix.length + selection.length + suffix.length;
				if (start === end) {
					// Should not happen in floating mode usually, but handling it
					const insidePos = start + prefix.length;
					textarea.setSelectionRange(insidePos, insidePos);
				} else {
					textarea.setSelectionRange(start + prefix.length, end + prefix.length);
				}
				// Force a toolbar update
				updateToolbarPosition();
			}
		});
	}

	// React to toolbar element implementation to adjust position (centering)
	$effect(() => {
		if (toolbarEl && showToolbar) {
			updateToolbarPosition();
		}
	});

	// Formatting handlers
	const handleBold = () => insertMarkdown('**', '**');
	const handleItalic = () => insertMarkdown('*', '*');
	const handleHeading = () => insertMarkdown('### ');
	const handleList = () => insertMarkdown('- ');
	const handleLink = () => insertMarkdown('[', '](url)');

	// Prevent button click from stealing focus
	const preventFocusLoss = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};
</script>

{#if showToolbar}
	<!-- Floating Toolbar (Simple Rectangle like Viber) -->
	<!-- Using portal behavior via fixed positioning -->
	<div
		bind:this={toolbarEl}
		class="fixed z-50 flex items-center gap-1 rounded-md bg-slate-800 p-1 text-white shadow-xl transition-opacity duration-150 ease-out"
		style="top: {toolbarPos.top}px; left: {toolbarPos.left}px; z-index: 9999;"
		onmousedown={preventFocusLoss}
		role="toolbar"
		tabindex="-1"
	>
		<!-- Dark Theme Buttons -->
		{@render ToolbarButtons({
			handleBold,
			handleItalic,
			handleHeading,
			handleList,
			handleLink,
			btnClass:
				'rounded-sm p-1.5 hover:bg-slate-700 hover:text-white focus:outline-none transition-colors',
			iconSize: 18
		})}
	</div>
{/if}

<!-- Snippet for buttons to avoid duplication -->
{#snippet ToolbarButtons({
	handleBold,
	handleItalic,
	handleHeading,
	handleList,
	handleLink,
	btnClass,
	iconSize
}: {
	handleBold: () => void;
	handleItalic: () => void;
	handleHeading: () => void;
	handleList: () => void;
	handleLink: () => void;
	btnClass: string;
	iconSize: number;
})}
	<button onclick={handleBold} type="button" class={btnClass} title="Bold" aria-label="Bold">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={iconSize}
			height={iconSize}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M14 12a4 4 0 0 0 0-8H6v8" /><path d="M15 20a4 4 0 0 0 0-8H6v8Z" /></svg
		>
	</button>

	<button onclick={handleItalic} type="button" class={btnClass} title="Italic" aria-label="Italic">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={iconSize}
			height={iconSize}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line
				x1="15"
				y1="4"
				x2="9"
				y2="20"
			/></svg
		>
	</button>

	<div class="mx-1 h-4 w-px bg-white/20"></div>

	<button
		onclick={handleHeading}
		type="button"
		class={btnClass}
		title="Heading"
		aria-label="Heading"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={iconSize}
			height={iconSize}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="M6 12h12" /><path d="M6 20V4" /><path d="M18 20V4" /></svg
		>
	</button>

	<button onclick={handleList} type="button" class={btnClass} title="List" aria-label="List">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={iconSize}
			height={iconSize}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line
				x1="8"
				y1="18"
				x2="21"
				y2="18"
			/><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line
				x1="3"
				y1="18"
				x2="3.01"
				y2="18"
			/></svg
		>
	</button>

	<button onclick={handleLink} type="button" class={btnClass} title="Link" aria-label="Link">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={iconSize}
			height={iconSize}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path
				d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
			></path></svg
		>
	</button>
{/snippet}
