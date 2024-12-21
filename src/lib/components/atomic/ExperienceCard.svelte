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

<div class="flex flex-col gap-2 w-full">
    <div class="flex flex-col gap-2 w-full">
        <div class="font-semibold text-xl md:col-span-12 col-span-1 hover:text-indigo-400 w-fit">
            <a href="{experience.company_website_url}">
                {experience.company_name}
            </a>
        </div>
        <p class="font-semibold text-sm uppercase tracking-widest text-neutral-400">{experience.job_title}</p>
        <p class="uppercase tracking-widest text-sm text-neutral-400">{formattedStartDate} - {formattedEndDate ?? 'Current'}</p>
    </div>
    {@html description}
    <div class="flex flex-col gap-2">
        <p class="font-semibold text-xs uppercase text-neutral-500 tracking-widest">Technologies</p>
        <p class="text-sm">{experience.technologies.join(" • ")}</p>
    </div>
</div>