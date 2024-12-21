<script lang="ts">
    import { LayoutStore } from "$lib/stores/LayoutStore.svelte";
    import Icon from "@iconify/svelte"
	import { fade, scale } from "svelte/transition";
	import MenuItem from "./atomic/MenuItem.svelte"
	import { MenuStore } from "$lib/stores/MenuStore.svelte";

    let layoutStore = LayoutStore;
    let menuStore = MenuStore;

    const closeModal = () => {
        layoutStore.menuOpen = false;
    }

    $effect(() => {
		let menuOpen = layoutStore.menuOpen;

		if (menuOpen) {
			var menuModalBg = document.getElementById('menu-modal-bg');

			menuModalBg?.addEventListener('click', (e: MouseEvent) => {
				if (e.target === menuModalBg) {
                    layoutStore.menuOpen = false;
                }
			});

			document.body.addEventListener('keydown', (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					layoutStore.menuOpen = false;
				}
			})
		}
	})
</script>

{#if layoutStore.menuOpen}
    <div id="menu-modal-bg" class="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 w-screen h-screen bg-neutral-900/60 backdrop-blur-md z-50 px-3 md:px-0" transition:fade={{duration: 200}}>
        <div id="menu-modal" class="flex flex-col gap-3 pb-3 max-w-xl w-full h-fit bg-neutral-800/65 rounded-lg -translate-y-5" transition:scale={{ duration: 200 }}>
            <div class="group inline-flex items-center w-full p-2 border-b border-neutral-800">
                <Icon icon="radix-icons:magnifying-glass" width="24" height="24" class="size-6 text-neutral-400 group-focus-within:text-white transition-colors"/>
                <input type="text" class="bg-transparent text-white w-full p-2 focus:outline-none" placeholder="Search..." />
                <button onclick="{closeModal}" class="bg-neutral-900/50 p-2 rounded-md hover:bg-neutral-900/80 transition-colors">
                    <Icon icon="radix-icons:cross-2" width="24" height="24" class="size-6 text-neutral-400"/>
                </button>
            </div>
            <div class="w-full flex flex-col gap-2 overflow-y-auto max-h-96">
                {#each menuStore.menus as menuItem}
                    <h4 class="px-3 text-sm text-neutral-400">{menuItem.title}</h4>
                    <div class="flex flex-col gap-2 px-3">
                        {#each menuItem.items as item}
                            <MenuItem menuItem={item} />
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}