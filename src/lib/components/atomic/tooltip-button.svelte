<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

    export let tooltipPosition: "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | undefined;
    export let tooltipOpenDelay: number = 0;
    export let tooltipCloseDelay: number = 0;
    export let tooltipDescription: string;

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: tooltipPosition
		},
		openDelay: tooltipOpenDelay,
		closeDelay: tooltipCloseDelay,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<div
    use:melt={$trigger}
    aria-roledescription="tooltip"
	aria-label="{tooltipDescription}"
	class="cursor-pointer rounded-lg border border-indigo-800/30 bg-indigo-600/30 p-3 transition-all hover:bg-indigo-600"
>
	<slot />
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class=" z-10 rounded-lg bg-slate-950 shadow-lg"
	>
		<div use:melt={$arrow}></div>
		<p class="px-2 py-1 text-sm text-white">{tooltipDescription}</p>
	</div>
{/if}
