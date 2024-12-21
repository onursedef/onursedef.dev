<script lang="ts">
	import { page } from "$app/stores";
	import PostCard from "$lib/components/atomic/PostCard.svelte";
    import { LayoutStore } from "$lib/stores/LayoutStore.svelte";

    LayoutStore.title = "Blog";
    LayoutStore.backgroundImage = "/taksim.png";

    const { data } = $page;
</script>


<svelte:head>
    <title>Onur Sedef's Blog</title>
    <meta name="description" content="Onur Sedef's personal website" />
    <meta property="og:title" content="Onur Sedef" />
    <meta property="og:description" content="Onur Sedef's personal website" />
    <meta property="og:image" content="/og_image.png" />
    <meta property="og:url" content="https://onursedef.dev" />
    <meta property="og:type" content="website" />
</svelte:head>
<div class="mt-6 flex flex-col gap-5">
    {#each data.posts as post}
        <PostCard post={post} />
    {/each}
</div>