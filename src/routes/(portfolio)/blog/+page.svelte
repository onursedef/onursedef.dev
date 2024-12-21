<script lang="ts">
	import { page } from "$app/stores";
	import PostCard from "$lib/components/atomic/PostCard.svelte";
    import { LayoutStore } from "$lib/stores/LayoutStore.svelte";

    LayoutStore.title = "Blog";
    LayoutStore.backgroundImage = "/taksim.png";

    const { data } = $page;
</script>

<div class="mt-6 flex flex-col gap-5">
    {#each data.posts as post}
        <PostCard post={post} />
    {/each}
</div>