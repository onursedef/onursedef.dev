<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	var accessToken = $state();
	var songCover = $state();
	var songName = $state();
	var songArtist = $state();
	var songAlbum = $state();

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<div class="flex w-full max-w-96 items-center gap-3">
	<div use:melt={$trigger} class="relative aspect-1 h-14">
		<div class="absolute inset-0 flex items-center justify-center gap-1 bg-black/30">
			<span
				class="max-h-4/5 inline-block h-2/5 w-1 bg-white"
				style="animation: up-and-down 1.3s ease infinite alternate; animation-delay: 0s;"
			></span>
			<span
				class="max-h-4/5 inline-block h-3/5 w-1 bg-white"
				style="animation: up-and-down 1.3s ease infinite alternate; animation-delay: 0.2s;"
			></span>
			<span
				class="max-h-4/5 inline-block h-1/5 w-1 bg-white"
				style="animation: up-and-down 1.3s ease infinite alternate; animation-delay: 0.4s;"
			></span>
			<span
				class="max-h-4/5 inline-block h-4/5 w-1 bg-white"
				style="animation: up-and-down 1.3s ease infinite alternate; animation-delay: 0.6s;"
			></span>
		</div>
		<img
			src="https://i.scdn.co/image/ab67616d00001e02586d3ac510fd1220ecfb97eb"
			alt="Sana Güvenmiyorum - Dedub Sessions"
			class="aspect-1 h-14 rounded-md border border-gray-300"
		/>
	</div>
	<div class="flex w-full flex-col justify-center overflow-hidden">
		<span class="text-xs font-light text-gray-700 dark:text-gray-300">Now Playing:</span>
		<span class="truncate text-sm font-bold">Sana Güvenmiyorum - Dedub Sessions</span>
		<span class="text-sm">Dedublüman, Aleyna Tilki</span>
	</div>
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-lg bg-slate-950 shadow-lg"
	>
		<div use:melt={$arrow}></div>
		<p class="px-2 py-1 text-sm text-white">Sana Güvenmiyorum (Dedub Sessions)</p>
	</div>
{/if}
