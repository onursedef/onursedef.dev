import type { MenuProps } from "$lib/types/MenuProps";

export const MenuStore = $state<MenuProps>({
    menus: [
        {
            title: 'Resume',
            items: [
                {
                    type: 'resume',
                    title: 'My Resume',
                    url: '/resume',
                    icon: null,
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
                    icon: "radix-icons:home",
                },
                {
                    type: 'page',
                    title: 'Blog',
                    url: '/blog',
                    icon: "radix-icons:file-text",
                },
                {
                    type: 'page',
                    title: 'Projects',
                    url: '/projects',
                    icon: "radix-icons:rocket",
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
                    icon: 'simple-icons:linkedin',
                },
                {
                    type: 'link',
                    title: 'Github',
                    url: 'https://github.com',
                    icon: 'simple-icons:github',
                },
                {
                    type: 'link',
                    title: 'Medium',
                    url: 'https://medium.com',
                    icon: 'simple-icons:medium',
                },
                {
                    type: 'link',
                    title: 'X',
                    url: 'https://x.com',
                    icon: 'simple-icons:x',
                },
                {
                    type: 'link',
                    title: 'Kick',
                    url: 'https://kick.com',
                    icon: 'simple-icons:kick',
                },
                {
                    type: 'link',
                    title: 'Youtube',
                    url: 'https://youtube.com',
                    icon: 'simple-icons:youtube',
                }
            ]
        }
    ]
})