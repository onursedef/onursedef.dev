<script lang="ts">
	import { ChevronDown } from "lucide-svelte";
    import { writable } from "svelte/store";

    let {
        title,
        active,
        href,
        sidebarOpen,
        items,
        children,
    } = $props<{
        title: string;
        active: boolean,
        href: string,
        sidebarOpen: boolean,
        items: {
            title: string,
            active: boolean,
            href: string,
        }[] | null,
        children: any,
    }>();

    var isDropdownOpen = writable(false);

    const toggleDropdown = () => {
        isDropdownOpen.update(value => !value);
    }
</script>

{#if items != null}
    <button onclick={toggleDropdown} class="flex flex-col {$isDropdownOpen ? 'gap-2' : ''} items-start transition-colors py-3 hover:bg-slate-700 rounded-e-md {sidebarOpen ? 'w-56' : 'w-14'}  {active ? 'bg-slate-600' : ''}">
        <div class="flex justify-between items-center px-6 w-full">
            <div class="inline-flex items-center gap-2">
                <div>{@render children()}</div>
                <span class="font-semibold select-none {sidebarOpen ? 'fade-in' : 'fade-out'}">{title}</span>
            </div>
                <div class="{sidebarOpen ? 'translate-x-0' : '-translate-x-64'} transition-all ml-auto p-1 hover:bg-slate-300 text-slate-400 hover:text-slate-600 rounded-full text-left">
                    <ChevronDown class="w-4 h-4 duration-300 transition-transform {$isDropdownOpen ? 'rotate-180' : 'rotate-0'}" />
                </div>
        </div>
        <div class="flex flex-col gap-2 w-full transition-all duration-300 overflow-hidden items-start {$isDropdownOpen ? 'max-h-screen-2xl opacity-100' : 'h-0 max-h-0 opacity-0'}">
            {#each items as item}
                <div class="pl-14 text-sm transition-colors hover:bg-slate-600 rounded-e-md px-4 py-2 w-full text-left {item.active ? 'bg-slate-600' : ''}">
                    <a href="{item?.href}" class="w-full h-full cursor-pointer">
                        <span>{item.title}</span>
                    </a>
                </div>
            {/each}
        </div>
    </button>
{:else}
    <a href="{href}" class="flex flex-col gap-2 items-start transition-colors py-3 hover:bg-slate-700 rounded-e-md {sidebarOpen ? 'w-56' : 'w-14'}  {active ? 'bg-slate-600' : ''}">
        <div class="flex justify-between items-center px-6 w-full">
            <div class="inline-flex items-center gap-2">
                <div>{@render children()}</div>
                <span class="font-semibold select-none {sidebarOpen ? 'fade-in' : 'fade-out'}">{title}</span>
            </div>
        </div>
    </a>
{/if}