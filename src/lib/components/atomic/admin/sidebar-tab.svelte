<script lang="ts">
	import { browser } from '$app/environment';
	import { ChevronDown } from 'lucide-svelte';
	import { writable, type Writable } from 'svelte/store';

	let { title, active, href, path, sidebarOpen, items, children } = $props<{
		title: string;
		active: boolean;
		href: string;
		path: Writable<string>;
		sidebarOpen: boolean;
		items:
			| {
					title: string;
					active: boolean;
					href: string;
			  }[]
			| null;
		children: any;
	}>();

	var isDropdownOpen = writable(false);

	const toggleDropdown = () => {
		isDropdownOpen.update((value) => !value);
	};

	if (items) {
		console.log(items.map((item: any) => item.active).includes(true));
	}

	$effect(() => {
		if (items) {
			isDropdownOpen.set(items.map((item: any) => item.active).includes(true));
		}
	});

	const setOptions = (href: string) => {
		path.set(href);
		if (browser) {
			window.location.href = href;
		}
		console.log('sidebar-tab', $path);
	};
</script>

{#if items != null}
	<button
		onclick={toggleDropdown}
		class="flex flex-col {$isDropdownOpen
			? 'gap-2'
			: ''} items-start rounded-e-md py-3 transition-colors hover:bg-slate-700 {sidebarOpen
			? 'w-56'
			: 'w-14'}  {items.map((item: any) => item.active).includes(true) ? 'bg-slate-600' : ''}"
	>
		<div class="flex w-full items-center justify-between px-6">
			<div class="inline-flex items-center gap-2">
				<div>{@render children()}</div>
				<span class="select-none font-semibold {sidebarOpen ? 'fade-in' : 'fade-out'}">{title}</span
				>
			</div>
			<div
				class="{sidebarOpen
					? 'translate-x-0'
					: '-translate-x-64'} ml-auto rounded-full p-1 text-left text-slate-400 transition-all hover:bg-slate-300 hover:text-slate-600"
			>
				<ChevronDown
					class="h-4 w-4 transition-transform duration-300 {$isDropdownOpen
						? 'rotate-180'
						: 'rotate-0'}"
				/>
			</div>
		</div>
		<div
			class="flex w-full flex-col items-start gap-2 overflow-hidden transition-all duration-300 {$isDropdownOpen &&
			sidebarOpen
				? 'max-h-screen-2xl opacity-100'
				: 'h-0 max-h-0 opacity-0'}"
		>
			{#each items as item}
				<a
					href={item.href}
					class="w-full rounded-e-md px-4 py-2 pl-14 text-left text-sm transition-colors hover:bg-slate-600 {item.active
						? 'bg-slate-500'
						: ''} h-full w-full cursor-pointer"
					role="button"
					tabindex="0"
				>
					<span>{item.title}</span>
				</a>
			{/each}
		</div>
	</button>
{:else}
	<button
		onclick={() => setOptions(href)}
		class="flex flex-col items-start gap-2 rounded-e-md py-3 transition-colors hover:bg-slate-700 {sidebarOpen
			? 'w-56'
			: 'w-14'}  {active ? 'bg-slate-600' : ''}"
	>
		<div class="flex w-full items-center justify-between px-6">
			<div class="inline-flex items-center gap-2">
				<div>{@render children()}</div>
				<span class="select-none font-semibold {sidebarOpen ? 'fade-in' : 'fade-out'}">{title}</span
				>
			</div>
		</div>
	</button>
{/if}
