<script lang="ts">
	import { menuOpen } from '$lib/stores/uiStore';
	import { Circle, File, Link, Search, X } from 'lucide-svelte';
	import Logo from '../../assets/images/logo.svg';
	import { fade, scale } from 'svelte/transition';

	$effect(() => {
		if ($menuOpen) document.documentElement.style.overflow = 'hidden';
		if ($menuOpen) {
			(document.querySelector('#modal') as HTMLElement)?.focus();
			document.querySelector('body')?.addEventListener('keydown', (e) => {
				if (e.key === 'Escape') {
					toggleModal();
				}
			});

			document.querySelector('#modal')?.addEventListener('click', (e) => {
				if (e.target === document.querySelector('#modal')) {
					toggleModal();
				}
			});
		}
		return () => (document.documentElement.style.overflow = 'auto');
	});

	const toggleModal = () => {
		menuOpen.update((value) => !value);
	};

	interface Menu {
		title: string;
		items: MenuItems[];
	}

	interface MenuItems {
		type: 'link' | 'method' | 'page' | 'resume';
		title: string;
		url: string;
		icon: string | null;
	}

	const menu: Menu[] = [
		{
			title: 'Resume',
			items: [
				{
					type: 'resume',
					title: 'Resume',
					url: '/resume',
					icon: null
				}
			]
		},
		{
			title: 'Pages',
			items: [
				{
					type: 'page',
					title: 'Home',
					url: '/',
					icon: null
				},
				{
					type: 'page',
					title: 'Blog',
					url: '/blog',
					icon: null
				},
				{
					type: 'page',
					title: 'Works',
					url: '/works',
					icon: null
				}
			]
		},
		{
			title: 'Links',
			items: [
				{
					type: 'link',
					title: 'LinkedIn',
					url: 'https://linkedin.com',
					icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>LinkedIn</title><path
					d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
				/></svg
			>`
				},
				{
					type: 'link',
					title: 'Github',
					url: 'https://github.com',
					icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
					><title>GitHub</title><path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					/></svg
					>`
				},
				{
					type: 'link',
					title: 'Medium',
					url: 'https://medium.com',
					icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>Medium</title><path
					d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
				/></svg
			>`
				},
				{
					type: 'link',
					title: 'X',
					url: 'https://x.com',
					icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>X</title><path
					d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
				/></svg>`
				},
				{
					type: 'link',
					title: 'Kick',
					url: 'https://kick.com',
					icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>Kick</title><path
					d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"
				/></svg
			>`
				},
				{
					type: 'link',
					title: 'Youtube',
					url: 'https://youtube.com',
					icon: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>YouTube</title><path
					d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
				/></svg
			>`
				}
			]
		}
	];
</script>

{#if $menuOpen}
	<div
		id="modal"
		class="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full select-none items-center justify-center bg-black/25 backdrop-blur-md transition-all"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="flex h-2/4 w-1/4 flex-col rounded-xl border-2 border-slate-900 bg-slate-900/90 shadow-2xl"
			transition:scale={{ duration: 200 }}
		>
			<div class="flex h-full w-full flex-col justify-between text-white">
				<!-- Header -->
				<div class="inline-flex w-full items-center gap-1 border-b border-white/45 px-3 text-white">
					<Search class="h-5 w-5 text-gray-400" />
					<input
						type="text"
						class="h-14 w-full appearance-none border-none bg-transparent text-xl ring-0 focus:outline-none focus:ring-0"
						placeholder="Type a command or search"
					/>
					<button onclick={toggleModal} class="rounded-full p-2 transition-all hover:bg-white/35">
						<X class="h-4 w-4" />
					</button>
				</div>

				<div class="flex w-full flex-col gap-1 overflow-y-auto px-3 py-4">
					{#each menu as menuSection}
						<h4 class="px-3 text-sm text-gray-300">{menuSection.title}</h4>
						<div class="flex flex-col gap-1">
							{#each menuSection.items as menuItem}
								<a
									href={menuItem.url}
									target={menuItem.type === 'link' || menuItem.type === 'resume'
										? '_blank'
										: '_self'}
									class="inline-flex w-full items-center gap-2 rounded-md p-3 transition-colors hover:bg-indigo-950/65"
								>
									{#if menuItem.type === 'page'}
										<File class="h-5 w-5 text-gray-400" />
									{:else if menuItem.type === 'method'}
										<Circle class="h-5 w-5 text-gray-400" />
									{:else if menuItem.type === 'resume'}
										<img src={Logo} alt="logo" class="h-5 w-5" />
									{:else if menuItem.type === 'link'}
										<div class="h-5 w-5 fill-gray-400">
											{@html menuItem.icon}
										</div>
									{/if}
									{menuItem.title}
								</a>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
