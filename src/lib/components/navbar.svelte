<script lang="ts">
	import logo from '../../assets/images/logo.svg';
	import logoBlack from '../../assets/images/logo-black.svg';
	import TooltipMenuButton from './atomic/tooltip-menu-button.svelte';
	import TooltipThemeChanger from './atomic/tooltip-theme-changer.svelte';
	import { writable } from 'svelte/store';
	import { isDark } from '$lib/stores/uiStore';
	import { fade } from 'svelte/transition';
</script>

<nav class="flex flex-row justify-between px-3 py-5">
	<a href="/" class="inline-flex items-center gap-5">
		<img src={$isDark ? logo : logoBlack} alt="logo" class="h-12 w-12" />
	</a>
	<div class="inline-flex gap-4">
		<TooltipMenuButton />
		<TooltipThemeChanger />
	</div>
</nav>
