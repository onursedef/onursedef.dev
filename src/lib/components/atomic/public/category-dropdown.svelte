<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { Menu } from 'lucide-svelte';

	const selectedCategory = $state('All');

	const {
		elements: { menu, item, trigger, arrow }
	} = createDropdownMenu();

	let { categories = [] } = $props<{
		categories: { name: string; slug: string }[];
	}>();
</script>

<button
	use:melt={$trigger}
	class="inline-flex w-fit items-center gap-3 rounded-md bg-slate-800/15 px-3 py-2 lg:hidden dark:bg-slate-800/75"
>
	<Menu /> Categories
</button>
<div
	use:melt={$menu}
	class="flex w-52 flex-col gap-3 rounded-lg bg-slate-400 p-3 dark:bg-slate-800"
>
	<a href="/blog" use:melt={$item}>All</a>
	{#each categories as category}
		<a href="?category={category.slug}" use:melt={$item}>{category.name}</a>
	{/each}
	<div use:melt={$arrow}></div>
</div>
