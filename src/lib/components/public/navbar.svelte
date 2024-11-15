<script lang="ts">
	import logo from '../../../assets/images/logo.svg';
	import logoBlack from '../../../assets/images/logo-black.svg';
	import TooltipMenuButton from '../atomic/public/tooltip-menu-button.svelte';
	import TooltipThemeChanger from '../atomic/public/tooltip-theme-changer.svelte';
	import { theme } from '$lib/stores/theme';
	import { writable } from 'svelte/store';

	let logoSrc = writable(logo);

	$effect(() => {
		theme.subscribe((value) => {
			logoSrc.set(value === 'dark' ? logo : logoBlack);
		});
	});
</script>

<nav class="flex flex-row justify-between px-3 py-5">
	<a href="/" class="inline-flex items-center gap-5">
		<img src={$logoSrc} alt="logo" class="h-12 w-12" />
	</a>
	<div class="inline-flex gap-4">
		<TooltipMenuButton />
		<TooltipThemeChanger />
	</div>
</nav>
