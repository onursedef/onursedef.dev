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


<div class="flex flex-col gap-2">
  <a href="{project.url}" class="font-semibold text-xl md:col-span-12 col-span-1 hover:text-indigo-400  w-fit">
    {project.title}
  </a>
  <p>
    {@html description}
  </p>
  <p class="font-semibold text-xs uppercase text-neutral-500 mt-2 tracking-widest">{project.technologies.join(" • ")}</p>
</div>