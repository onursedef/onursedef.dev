<script lang="ts">
    import { page } from '$app/stores';
	import PostCard from '$lib/components/atomic/PostCard.svelte';
	import { LayoutStore } from '$lib/stores/LayoutStore.svelte';

    const { data } = $page;

    LayoutStore.backgroundImage = "/taksim.png";
</script>

<svelte:head>
    <title>Onur Sedef</title>
    <meta name="description" content="Onur Sedef's personal website" />
    <meta property="og:title" content="Onur Sedef" />
    <meta property="og:description" content="Onur Sedef's personal website" />
    <meta property="og:image" content="/og_image.png" />
    <meta property="og:url" content="https://onursedef.dev" />
    <meta property="og:type" content="website" />
</svelte:head>
<div class="inline-flex w-full items-end justify-between">
    <h2 class="text-3xl">Blog</h2>
    <div class="group/see-more relative w-fit">
        <a href="/blog" class="text-indigo-500 text-base z-10">see more</a>
        <p class="absolute top-0 left-0 right-0 bottom-0 text-indigo-400 opacity-0 text-base invisible group-hover/see-more:opacity-100 group-hover/see-more:visible group-hover/see-more:blur-md pointer-events-none transition-all">see more</p>
    </div>
</div>
<div class="mt-6 flex flex-col gap-5">
    {#each data.posts as post}
        <PostCard post={post} />
    {/each}
</div>