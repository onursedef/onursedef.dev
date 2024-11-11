<script lang="ts">
	import logo from '../../assets/images/logo.svg';
	import TooltipMenuButton from './atomic/tooltip-menu-button.svelte';
	import TooltipThemeChanger from './atomic/tooltip-theme-changer.svelte';
</script>

<nav class="flex flex-row justify-between px-3 py-5">
	<a href="/" class="inline-flex items-center gap-5">
		<img src={logo} alt="logo" class="h-12 w-12" />
	</a>
	<div class="inline-flex gap-4">
		<TooltipMenuButton />
		<TooltipThemeChanger />
	</div>
</nav>
