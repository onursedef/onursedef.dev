<script lang="ts">
	import type { Project } from "$lib/types/Project";
	import Icon from "@iconify/svelte";


    const { project } = $props<{ project: Project }>();
</script>

<div class="group/project w-full p-4 bg-neutral-900/50 border-2 border-neutral-700 rounded-lg flex items-center gap-4 hover:bg-neutral-900 hover:border-neutral-600 transition-colors md:flex-row flex-col">
    <div class="flex relative md:w-44 md:h-32 w-full h-32 rounded-lg flex-shrink-0">
        <img src="https://directus.onursedef.dev/assets/{project.image}/{project.slug}.png" alt="{project.title}" class="md:w-44 md:h-32 w-full h-32 rounded-lg object-cover" />
        <img src="https://directus.onursedef.dev/assets/{project.image}/{project.slug}.png" alt="{project.title}" class="absolute top-0 left-0 right-0 bottom-0 md:w-44 md:h-32 w-full h-32 rounded-lg object-cover invisible group-hover/project:visible group-hover/project:blur-md duration-300 transition-all opacity-50 -z-10 select-none" />
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/35 rounded-lg group-hover/project:bg-neutral-900/0 transition-colors z-10"></div>
    </div>
    <div class="flex flex-col items-start justify-between h-48 md:h-32 gap-1 md:gap-0 ">
        <div class="flex relative">
            <p class="text-2xl text-indigo-300 z-10">{project.title}</p>
            <h3 class="h3 absolute top-0 left-0 text-2xl text-indigo-600 invisible group-hover/project:visible group-hover/project:blur-md duration-300 transition-all opacity-100 pointer-events-none select-none">{project.title}</h3>
        </div>
        <div class="text-base text-neutral-300 line-clamp-3">
            {project.summary}
        </div>
        <div class="flex gap-4 items-center mt-1">
            {#if project.github_url != null} 
            <div class="inline-flex gap-2 items-center">
                <Icon icon="simple-icons:github" width="24" height="24" class="size-4 text-neutral-400" />
                <a href={project.github_url} class="text-sm text-neutral-400">Github</a>
            </div>
            {/if}
            {#if project.website_url != null} 
            <div class="inline-flex gap-2 items-center">
                <Icon icon="mdi:world" width="24" height="24" class="size-4 text-neutral-400" />
                <a href={project.website_url} class="text-sm text-neutral-400">Website</a>
            </div>
            {/if}
        </div>
    </div>
</div>