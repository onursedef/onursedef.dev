<script lang="ts">
	import type { ResumeProjectCardProps } from "$lib/types/ResumeProjectCardProps";
	import { marked } from "marked";
	import { onMount } from "svelte";

    const { project } = $props<{ project: ResumeProjectCardProps }>();
    let description = $state<string>("");

    onMount(async () => {
        description = await marked(project.description);
    })
</script>


<div class="col-span-12 w-full h-px bg-neutral-700 my-2"></div>
<div class="md:col-span-4 col-span-1">
    <a href="{project.url}" class="font-semibold text-xl md:col-span-12 col-span-1 dark:hover:text-violet-400 hover:text-violet-700 w-fit">
      {project.title}
    </a>
</div>
<div class="md:col-span-8 col-span-1 -mt-2">
    <p>
      {@html description}
    </p>
    <p class="font-semibold text-xs uppercase text-neutral-500 mt-2 tracking-widest">{project.technologies.join(" • ")}</p>
</div>