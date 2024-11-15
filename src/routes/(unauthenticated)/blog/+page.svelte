<script lang="ts">
	import FeaturedPosts from '$lib/components/public/featured-posts.svelte';
	import LatestPosts from '$lib/components/public/latest-posts.svelte';
</script>

<svelte:head>
	<title>Onur Sedef - Blog</title>
</svelte:head>
<div class="flex flex-1 flex-col gap-10 p-5">
	<FeaturedPosts />
	<LatestPosts />
</div>
