<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
	
	let rotating = false;
	
	const handleClick = () => {
		rotating = true;
		setTimeout(() => (rotating = false), 500);
		theme.update((value) => value === 'dark' ? 'light' : 'dark');
	};

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
</script>

<button
	onclick={handleClick}
	use:melt={$trigger}
	aria-roledescription="tooltip"
	aria-label="Change Theme"
	class="cursor-pointer rounded-lg border border-indigo-800/80 bg-indigo-600/80 p-3 text-white transition-all hover:bg-indigo-600 dark:border-indigo-800/30 dark:bg-indigo-600/30"
>
	{#if $theme === 'dark'}
		<div class:rotate={rotating}>
			<Sun class="aspect-1 w-5" />
		</div>
	{:else}
		<div class:rotate={rotating}>
			<Moon class="aspect-1 w-5" />
		</div>
	{/if}
</button>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg bg-slate-950 shadow-lg"
	>
		<div use:melt={$arrow}></div>
		<p class="px-2 py-1 text-sm text-white">
			{#if $theme === 'dark'}
				Light Theme
			{:else}
				Dark Theme
			{/if}
		</p>
	</div>
{/if}

<style>
	.rotate {
		animation: rotate 350ms ease-in-out;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
