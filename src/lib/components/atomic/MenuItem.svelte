<script lang="ts">
	import type { MenuItem } from "$lib/types/MenuProps";
	import Icon from "@iconify/svelte";
	import Logo from "../icons/Logo.svelte";
	import { LayoutStore } from "$lib/stores/LayoutStore.svelte";

    let layoutStore = LayoutStore;
    let active = $state(false);

    let { menuItem } = $props<{ menuItem : MenuItem }>();

    const handleClick = () => {
        layoutStore.menuOpen = false;
    }

    $effect(() => {
        // get url path
        let path = window.location.pathname;

        if (path.split('/')[1] === menuItem.url.split('/')[1]) {
            active = true;
        } else {
            active = false;
        }
    })
</script>

{#if menuItem.type === 'page'}
    <a href="{menuItem.url}" onclick="{handleClick}" class="group w-full inline-flex items-center px-3 py-2 hover:bg-neutral-600/50 transition-colors rounded-md gap-2">
        <Icon icon={menuItem.icon ?? "radix-icons:file"} width="24" height="24" class="size-6 {active ? 'text-white' : 'text-neutral-400'} group-hover:text-white"/>
        <p class="{active ? 'text-white' : 'text-neutral-400'} group-hover:text-white">{menuItem.title}</p>
    </a>
{:else if menuItem.type === 'method'}
    <button class="group w-full inline-flex items-center px-3 py-2 hover:bg-neutral-600/50 transition-colors rounded-md gap-2">
        <Icon icon={menuItem.icon ?? "radix-icons:file"} width="24" height="24" class="size-6 {active ? 'text-white' : 'text-neutral-400'} group-hover:text-white"/>
        <p class="{active ? 'text-white' : 'text-neutral-400'} group-hover:text-white">{menuItem.title}</p>
    </button>
{:else if menuItem.type === 'resume'}
    <a onclick="{handleClick}" href="{menuItem.url}" class="group w-full inline-flex items-center px-3 py-2 hover:bg-neutral-600/50 transition-colors rounded-md gap-2">
         <Logo class="size-6 {active ? 'text-white' : 'text-neutral-400'} group-hover:text-white"/>
        <p class="{active ? 'text-white' : 'text-neutral-400'} group-hover:text-white">{menuItem.title}</p>
    </a>
{:else}
    <a onclick="{handleClick}" href="{menuItem.url}" class="group w-full inline-flex items-center px-3 py-2 hover:bg-neutral-600/50 transition-colors rounded-md gap-2">
        <Icon icon={menuItem.icon ?? "radix-icons:file"} width="24" height="24" class="size-6 text-neutral-400 group-hover:text-white"/>
        <p class="text-neutral-400 group-hover:text-white">{menuItem.title}</p>
    </a>
{/if}