<script lang="ts">
	import CategoryChip from "$lib/components/atomic/category-chip.svelte";
	import Github from "$lib/components/atomic/icons/github.svelte";
	import { ExternalLink, GithubIcon } from "lucide-svelte";
    import Placeholder from '../../assets/images/placeholder-1.jpg';
	import WorkCard from "$lib/components/atomic/work-card.svelte";
	import CategoryDropdown from "$lib/components/atomic/category-dropdown.svelte";

    const categories = [
        {
            name: 'Web Development',
            slug: 'web-development'
        },
        {
            name: 'Mobile',
            slug: 'mobile'
        },
        {
            name: 'Desktop',
            slug: 'desktop'
        },
        {
            name: 'Game',
            slug: 'game'
        }
    ]

    const works = [
        {
            image: Placeholder,
            title: 'WebApp',
            category: 'Web',
            description: 'WebApp is a web application that is built with React and TailwindCSS. It is a simple web application that is built for learning purposes.',
            githubLink: 'https://github.com',
            webLink: 'https://webapp.com'
        },
        {
            image: Placeholder,
            title: 'MobileApp',
            category: 'Mobile',
            description: 'MobileApp is a mobile application that is built with React Native and TailwindCSS. It is a simple mobile application that is built for learning purposes.',
            githubLink: 'https://github.com',
            webLink: 'https://mobileapp.com'
        },
        {
            image: Placeholder,
            title: 'DesktopApp',
            category: 'Desktop',
            description: 'DesktopApp is a desktop application that is built with Electron and TailwindCSS. It is a simple desktop application that is built for learning purposes.',
            githubLink: 'https://github.com',
            webLink: 'https://desktopapp.com'
        },
        {
            image: Placeholder,
            title: 'GameApp',
            category: 'Game',
            description: 'GameApp is a game application that is built with Unity and TailwindCSS. It is a simple game application that is built for learning purposes.',
            githubLink: 'https://github.com',
            webLink: 'https://gameapp.com'
        }
    ]
</script>

<div class="flex flex-col gap-5 px-3">
    <div class="inline-flex lg:hidden items-center justify-between">
        <h1 class="text-3xl font-bold">Works</h1>
        <CategoryDropdown categories={categories} />
    </div>
    <h1 class="text-3xl font-bold hidden lg:block">Works</h1>
    <div class="hidden lg:inline-flex gap-2">
        <a
			href=""
			class="rounded-lg border-2 border-slate-800 bg-slate-700/65 px-6 py-1 transition-colors hover:bg-slate-800"
		>
			All
		</a>
        {#each categories as category}
            <CategoryChip {...category} selected={false} />
        {/each}
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {#each works as work}
            <WorkCard {...work} />
        {/each}
    </div>
</div>