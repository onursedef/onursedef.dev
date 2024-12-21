import type { LayoutProps } from "$lib/types/LayoutProps";

export const LayoutStore = $state<LayoutProps>({
    backgroundImage: "/taksim.png",
    title: "",
    menuOpen: false,
    isHome: false
})