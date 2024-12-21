<script lang="ts">
	import type { ExperienceCardProps } from "$lib/types/ExperienceCardProps";
	import { marked } from "marked";
	import { onMount } from "svelte";

    const { experience } = $props<{experience : ExperienceCardProps}>();
    let description = $state<string>("");

    // format 2023-04-03T12:00:00 date to Apr 2023
    const formattedStartDate = new Date(experience.start_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    const formattedEndDate = experience.end_date ? new Date(experience.end_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    }) : null

    onMount(async () => {
        description = await marked(experience.job_description);
    })
</script>

<div class="col-span-12 w-full h-px bg-neutral-700 my-2"></div>
<div class="md:col-span-4">
    <div class="font-semibold text-xl md:col-span-12 col-span-1 dark:hover:text-violet-400 hover:text-violet-700 w-fit">
        <a href="{experience.company_website_url}">
            {experience.company_name}
        </a>
    </div>
    <p class="font-semibold">{experience.job_title}</p>
    <p class="text-sm">{formattedStartDate} - {formattedEndDate ?? 'Current'}</p>
</div>
<div class="md:col-span-8 col-span-1 -mt-2 mb-4">
    <p class="prose prose-invert text-white prose-sm leading-normal">
        {@html description}
    </p>
    <p class="font-semibold text-xs uppercase text-neutral-500 mt-4 tracking-widest">Technologies</p>
    <p class="mt-2 text-sm">{experience.technologies.join(" • ")}</p>
</div>