<script lang="ts">
	import { Eye } from "lucide-svelte";

    export let post;
</script>

<a href="#" class="flex w-full flex-1 gap-3 rounded-lg p-3 hover:bg-indigo-600/25">
    <img src={post.image_url} alt={post.title} class="w-48 rounded-lg object-cover" />
    <div class="flex w-4/5 flex-col gap-2">
        <h1 class="text-wrap text-lg font-bold">{post.title}</h1>
        <p class="font-light">{post.short_description}</p>
        <span class="inline-flex items-center gap-1 text-xs text-gray-400"
            ><Eye class="h-5 w-5" /> {post.view_count}</span
        >
    </div>
</a>