<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import { calculateReadingTime } from "$lib/utils/utils";


    const { post } = $props<{ post: Post }>();

    const formattedDate = new Date(post.date_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const timeToRead = calculateReadingTime(post.content);
</script>

<div class="group/post w-full p-4 bg-neutral-900/50 border-2 border-neutral-700 rounded-lg flex items-center gap-4 hover:bg-neutral-900 hover:border-neutral-600 transition-colors sm:flex-row flex-col">
    <div class="flex relative w-full h-56 rounded-lg flex-shrink-0">
        <img src="https://directus.onursedef.dev/assets/{post.featured_image}/{post.slug}.png" alt="{post.title}" class="w-full h-56 rounded-lg object-cover" />
        <img src="https://directus.onursedef.dev/assets/{post.featured_image}/{post.slug}.png" alt="{post.title}" class="absolute top-0 left-0 right-0 bottom-0 w-full h-56 rounded-lg object-cover invisible group-hover/post:visible group-hover/post:blur-md duration-300 transition-all opacity-50 -z-10 select-none" />
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/35 rounded-lg group-hover/post:bg-neutral-900/0 transition-colors z-10"></div>
    </div>
    <div class="flex flex-col items-start justify-evenly h-32 gap-2 sm:gap-0">
        <div class="flex relative">
            <a href="/blog/{post.slug}" class="text-xl md:text-2xl text-indigo-300 z-10">{post.title}</a>
            <h3 class="h3 absolute top-0 left-0 text-2xl text-indigo-600 invisible group-hover/post:visible group-hover/post:blur-md duration-300 transition-all opacity-100 pointer-events-none select-none">{post.title}</h3>
        </div>
        <div class="text-base text-neutral-300 line-clamp-2 sm:line-clamp-3">
            {post.summary}
        </div>
        <p class="text-xs md:text-sm text-neutral-400">{formattedDate} • {timeToRead} • {post.like_count} like{post.like_count > 1 ? 's' : ''} • {post.view_count} view{post.view_count > 1 ? 's' : ''}</p>
    </div>
</div>