<script lang="ts">
	import { ChevronLeft, Dock, File, Home, ScrollText } from 'lucide-svelte';
	import SidebarTab from '../atomic/admin/sidebar-tab.svelte';
	import Logo from '../../../assets/images/logo.svg';
	import { writable } from 'svelte/store';

	let isSidebarOpen = writable(true);

	const toggleSidebar = () => {
		isSidebarOpen.update((value) => !value);
	};

	let path = writable('/admin');

	const tabs = [
		{
			title: 'Dashboard',
			active: false,
			href: '/admin',
			items: null,
			icon: Home
		},
		{
			title: 'Blog',
			active: false,
			href: '',
			items: [
				{
					title: 'Posts',
					active: false,
					href: '/admin/posts'
				},
				{
					title: 'Categories',
					active: false,
					href: '/admin/categories'
				},
				{
					title: 'Tags',
					active: false,
					href: '/admin/tags'
				},
				{
					title: 'Comments',
					active: false,
					href: '/admin/comments'
				}
			],
			icon: ScrollText
		},
		{
			title: 'Works',
			active: false,
			href: '/admin/works',
			items: null,
			icon: Dock
		},
		{
			title: 'Resume',
			active: false,
			href: '/admin/resume',
			items: null,
			icon: File
		}
	];

	import { onMount } from 'svelte';

	onMount(() => {
		const unsubscribe = path.subscribe((value) => {
			console.log(value);
			tabs.forEach((tab) => {
				if (tab.items !== null) {
					tab.items.forEach((item) => {
						item.active = item.href === value;
					});
				} else {
					tab.active = tab.href === value;
				}
			});
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div
	class="relative flex flex-col gap-5 transition-all duration-300 {$isSidebarOpen
		? 'w-64'
		: 'w-20'} h-screen flex-shrink-0 border-r-2 border-slate-600 bg-slate-800 py-6"
>
	<div class="inline-flex w-full items-center justify-center gap-2">
		<img src={Logo} alt="logo" class="aspect-1 w-14" />
		<h1 class="ml-2 text-2xl font-bold {$isSidebarOpen ? 'fade-in' : 'fade-out'}">Panel</h1>
	</div>
	<div class="absolute -right-3 top-48">
		<button
			onclick={toggleSidebar}
			class="rounded-full bg-slate-500 p-1 transition-colors hover:bg-slate-600"
		>
			<ChevronLeft
				class="h-4 w-4 transform text-white transition-transform duration-300 {$isSidebarOpen
					? 'rotate-0'
					: 'rotate-180'}"
			/>
		</button>
	</div>
	<div class="flex flex-col gap-2">
		{#each tabs as tab}
					<SidebarTab
					title={tab.title}
					active={tab.active}
					href={tab.href}
					items={tab.items}
					sidebarOpen={$isSidebarOpen}
					path={path}
				>
					<svelte:component this={tab.icon} class="h-6 w-6" />
				</SidebarTab>
		{/each}
	</div>
</div>
