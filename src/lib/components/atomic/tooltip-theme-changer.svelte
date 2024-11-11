<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { Moon, Sun } from 'lucide-svelte';

	const isDark = writable(false);

	import { onMount } from 'svelte';

	const changeTheme = () => {
		const html = document.querySelector('html');
		if (html) {
			if (html.classList.contains('dark')) {
				html.classList.remove('dark');
				html.classList.add('light');
				isDark.set(false);
			} else {
				html.classList.remove('light');
				html.classList.add('dark');
				isDark.set(true);
			}
		}
	};

	onMount(() => {
		const html = document.querySelector('html');
		if (html && html.classList.contains('dark')) {
			isDark.set(true);
		} else {
			isDark.set(false);
		}
	});

	let rotating = false;

	const handleClick = () => {
		rotating = true;
		setTimeout(() => (rotating = false), 500);
		changeTheme();
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
	on:click={handleClick}
	use:melt={$trigger}
	aria-roledescription="tooltip"
	aria-label="Change Theme"
	class="cursor-pointer rounded-lg border border-indigo-800/30 bg-indigo-600/30 p-3 transition-all hover:bg-indigo-600"
>
	{#if $isDark}
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
			{#if $isDark}
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
