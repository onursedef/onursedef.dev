<script lang="ts">
    import { createDropdownMenu, melt } from "@melt-ui/svelte";
	import { Menu } from "lucide-svelte";

    const selectedCategory = $state("All");

    const {
        elements: { menu, item, trigger, arrow }
    } = createDropdownMenu();

    let {
        categories = []
    } = $props<{
        categories: { name: string; slug: string }[];
    }>();
</script>

<button use:melt={$trigger} class="inline-flex lg:hidden items-center gap-3 px-3 py-2 bg-slate-800/75 w-fit rounded-md">
    <Menu /> Categories
</button>
<div use:melt={$menu} class="flex flex-col  gap-3 bg-slate-800 w-52 p-3 rounded-lg">
    <a href="/blog" use:melt={$item}>All</a>
    {#each categories as category}
        <a href="?category={category.slug}" use:melt={$item}>{category.name}</a>
    {/each}
    <div use:melt={$arrow}></div>
</div>