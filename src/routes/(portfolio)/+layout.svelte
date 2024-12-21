<script lang="ts">
	import '../../app.css';
	import { LayoutStore } from '$lib/stores/LayoutStore.svelte';
	import MenuModal from '$lib/components/MenuModal.svelte';
	import Icon from '@iconify/svelte';
	import WeatherAndTime from '$lib/components/atomic/WeatherAndTime.svelte';
	import NowPlaying from '$lib/components/atomic/NowPlaying.svelte';
	import XCard from '$lib/components/atomic/XCard.svelte';
	import LinkedInCard from '$lib/components/atomic/LinkedInCard.svelte';
	import GithubCard from '$lib/components/atomic/GithubCard.svelte';
	import KickCard from '$lib/components/atomic/KickCard.svelte';
	import MediumCard from '$lib/components/atomic/MediumCard.svelte';
	import YoutubeCard from '$lib/components/atomic/YoutubeCard.svelte';
	import { page } from '$app/stores';
	let layoutStore = LayoutStore;

	const toggleMenu = () => {
		layoutStore.menuOpen = !layoutStore.menuOpen;
	};

	let isHome = $state<boolean>(true);

	$effect(() => {
		$page.route.id === "/(portfolio)" ? isHome = true : isHome = false;
		if (layoutStore.menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	})

	const { children } = $props();
</script>
 
<div class="flex relative flex-col items-center overflow-x-clip pb-20 min-h-screen overflow-y-clip">
	<MenuModal />
	<div class="absolute top-0 left-0 right-0 w-full h-64 bg-gradient-to-t from-neutral-900 to-transparent"></div>
	<img src="/blob_1.svg" alt="blob" class="absolute top-1/3 -right-1/2 md:right-1/2 md:top-64 -rotate-12 md:-translate-x-1/4  object-cover select-none pointer-events-none -z-10" />
	<img src="/blob_2.svg" alt="blob" class="absolute -bottom-36 -right-1/2  md:top-48 md:-right-44 object-cover select-none pointer-events-none" />
	<img src="/blob_3.svg" alt="blob" class="absolute bottom-36 -left-1/2 rotate-90 md:rotate-0 md:-bottom-56 md:left-1/2 object-cover select-none pointer-events-none -z-10" />
	<img src="/blob_4.svg" alt="blob" class="absolute -left-36 -rotate-12 top-64 object-cover select-none pointer-events-none md:hidden -z-10" />
	<div class="max-w-3xl absolute top-0 left-auto right-auto w-full p-4 h-64">
		<div class="flex flex-col w-full items-end h-full justify-between">
			<div class="flex justify-end">
				<button onclick="{toggleMenu}" class="bg-black/70 p-3 rounded-md hover:bg-black/80 transition-colors">
					<Icon icon="lucide:command" width="24" height="24" class="size-6 text-white"/>
				</button>
			</div>
			<div class="w-full flex justify-end md:justify-between items-end">
				{#if isHome}
					<p class="ml-40 text-2xl hidden md:inline-flex items-center gap-3">Hello, I am <span class="font-bold">Onur</span> <Icon icon="fluent-emoji:waving-hand" width="32" height="32" /></p>
				{:else}
					<p class='text-3xl hidden md:block'>{layoutStore.title}</p>
				{/if}
				<WeatherAndTime />
			</div>
		</div>
		<div class="relative top-6">
			{#if isHome}
				<p class="ml-40 text-lg md:text-xl sm:text-2xl md:hidden inline-flex items-center gap-3">Hello, I am <span class="font-bold">Onur</span> <Icon icon="fluent-emoji:waving-hand" width="32" height="32" /></p>
			{:else}
				<p class='text-2xl block md:hidden'>{layoutStore.title}</p>
			{/if}
		</div>
		{#if isHome}
			<div class="flex relative bottom-20 md:bottom-16 w-fit h-fit">
				<img src="https://secure.gravatar.com/avatar/538d2b19430c2f5bc9ae69620620d8a6?s=512&d=mm&r=g" alt="Onur Sedef" class="w-32 h-32 rounded-full object-cover z-10 pointer-events-none select-none">
				<img src="https://secure.gravatar.com/avatar/538d2b19430c2f5bc9ae69620620d8a6?s=512&d=mm&r=g" alt="Onur Sedef" class="absolute top-0 w-32 h-32 rounded-full blur-md object-cover z-0 pointer-events-none select-none">
			</div>
		{/if}
	</div>
	<img src="{layoutStore.backgroundImage}" alt="Taksim" class="h-64 w-full object-cover pointer-events-none select-none" />
	{#if isHome}
		<div class="max-w-3xl w-full h-full inline-flex justify-end md:mt-0 mt-20 md:px-0 px-3 z-10">
			<div class="max-w-[37rem] border border-neutral-700 bg-neutral-900/50 p-4 rounded-lg w-full h-fit">
				<p>Hey there! I’m a back-end developer @ <a href="https://ottoo.com" class='font-semibold'>ottoo</a> with 2.5+ years of experience building scalable apps and automating workflows.</p>
			</div>
		</div>
	{/if}
	<div class="max-w-[46rem] w-full h-full {isHome ? 'mt-12' : 'mt-5'} flex flex-col px-3 md:px-0 z-0 justify-start">
		{@render children()}
	</div>
	<div class="relative flex flex-col w-full items-center mt-auto">
		<div class="flex items-center gap-4 my-10 w-full">
			<div class="w-full h-px bg-neutral-600 block"></div>
			<NowPlaying />
			<div class="w-full h-px bg-neutral-600 block"></div>
		</div>
		<div class="mt-auto max-w-[46rem] w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-5 px-3 md:px-0">
			<XCard />
			<LinkedInCard />
			<GithubCard />
			<KickCard />
			<MediumCard />
			<YoutubeCard />
		</div>
	</div>
</div>