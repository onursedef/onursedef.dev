<script>
	import { ChevronLeft, Dock, File, Home, ScrollText } from "lucide-svelte";
	import SidebarTab from "../atomic/admin/sidebar-tab.svelte";
    import Logo from '../../../assets/images/logo.svg';
	import { writable } from "svelte/store";

    let isSidebarOpen = writable(true);

    const toggleSidebar = () =>{
        isSidebarOpen.update(value => !value);
    }

    const tabs = [
        {
            title: 'Dashboard',
            active: true,
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
            href: '/admin',
            items: null,
            icon: Dock
        },
        {
            title: 'Resume',
            active: false,
            href: '/admin',
            items: null,
            icon: File
        }
    ]
</script>

<div class="relative flex flex-col gap-5 transition-all duration-300 {$isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 h-screen py-6 flex-shrink-0 border-r-2 border-slate-600">
    <div class="inline-flex items-center justify-center w-full gap-2">
        <img src="{Logo}" alt="logo" class="w-14 aspect-1">
        <h1 class="text-2xl font-bold ml-2 {$isSidebarOpen ? 'fade-in': 'fade-out'}">Panel</h1>
    </div>
    <div class="absolute -right-3 top-48">
        <button onclick="{toggleSidebar}" class="p-1 rounded-full bg-slate-500 hover:bg-slate-600 transition-colors">
            <ChevronLeft class="w-4 h-4 text-white transition-transform duration-300 transform {$isSidebarOpen ? 'rotate-0' : 'rotate-180'}" />
        </button>
    </div>
    <div class="flex flex-col gap-2">
        {#each tabs as tab}
            <SidebarTab title={tab.title} active={tab.active} href={tab.href} items={tab.items} sidebarOpen={$isSidebarOpen}>
                <svelte:component this={tab.icon} class="w-6 h-6" />
            </SidebarTab>
        {/each}
    </div>
</div>