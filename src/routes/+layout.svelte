<script lang="ts">
	import { Command, Sun } from 'lucide-svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import '../app.css';
	import logo from '../assets/images/logo.svg';
	import TooltipButton from '$lib/components/atomic/tooltip-button.svelte';
	import TooltipThemeChanger from '$lib/components/atomic/tooltip-theme-changer.svelte';

	let { children } = $props();

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

	const changeTheme = () => {
		const html : HTMLElement | null = document.querySelector('html');
		if (html !== null) {
			var isDark = html.classList.contains('dark');
			if (isDark) {
				html.classList.remove('dark');
				html?.classList.add('light');
			} else {
				html?.classList.remove('light');
				html.classList.add('dark');
			}
		}
	}
</script>

<main class="@container">
	<div class="ml-auto mr-auto max-w-2xl 2xl:max-w-3xl">
		<nav class="flex flex-row justify-between py-5">
			<a href="/" class="inline-flex items-center gap-5">
				<img src={logo} alt="logo" class="h-12 w-12" />
			</a>
			<div class="inline-flex gap-4">
				<TooltipButton tooltipDescription="Open Menu" tooltipPosition="bottom">
					<Command class="aspect-1 w-5" />
				</TooltipButton>
				<TooltipThemeChanger />
			</div>
		</nav>
		{@render children()}
	</div>
</main>
