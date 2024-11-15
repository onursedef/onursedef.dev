<script lang="ts">
	import { type TableOfContentsItem, type TableOfContentsElements, melt } from '@melt-ui/svelte';

	export let tree: TableOfContentsItem[] = [];
	export let activeHeadingIdxs: number[];
	export let item: TableOfContentsElements['item'];
	export let level = 1;

	function scrollToId(
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		},
		id: string
	) {
		event.preventDefault(); // Prevent the default anchor behavior
		const targetElement = document.getElementById(id);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<ul class="m-0 list-none {level !== 1 ? 'pl-4' : ''} ">
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="mt-0 pt-2">
				<a
					href="#{heading.id}"
					on:click={(event) => scrollToId(event, heading.id)}
					use:melt={$item(heading.id)}
					class="inline-flex items-center justify-center gap-1 text-neutral-800 no-underline transition-colors hover:!text-indigo-700
             data-[active]:text-indigo-800 dark:text-neutral-200 dark:hover:!text-indigo-300 dark:data-[active]:text-indigo-400"
				>
					{@html heading.node.innerHTML}
				</a>
				{#if heading.children && heading.children.length}
					<svelte:self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
