<script lang="ts">
	import { menuOpen } from '$lib/stores/uiStore';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { Command } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'bottom'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});

	const toggleModal = () => {
		menuOpen.update((value) => !value);
	};

	$effect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				console.log('pressed');
				menuOpen.update((value) => !value);
			}
		};
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<button
	id="menu-button"
	use:melt={$trigger}
	onclick={toggleModal}
	aria-roledescription="tooltip"
	aria-label="Open Menu"
	class="cursor-pointer rounded-lg border border-indigo-800/80 bg-indigo-600/80 p-3 text-white transition-all hover:bg-indigo-600 dark:border-indigo-800/30 dark:bg-indigo-600/30"
>
	<Command class="aspect-1 w-5" />
</button>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class=" z-10 rounded-lg bg-slate-950 shadow-lg"
	>
		<div use:melt={$arrow}></div>
		<p class="px-2 py-1 text-sm text-white">Open Menu</p>
	</div>
{/if}
