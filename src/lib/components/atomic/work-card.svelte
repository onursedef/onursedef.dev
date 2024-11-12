<script lang="ts">
	import { ExternalLink } from "lucide-svelte";
	import Github from "./icons/github.svelte";

    let {
        image,
        title,
        category,
        description,
        githubLink,
        webLink
    } = $props<{
        image: string;
        title: string;
        category: string;
        description: string;
        githubLink: string | null;
        webLink: string | null;
    }>();
</script>

<div class="flex flex-col gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/65">
    <img src="{image}" alt="placeholder" class="w-full aspect-[3/2] rounded-lg object-cover">
    <div class="flex flex-col gap-1">
        <div class="inline-flex justify-between items-center">
            <h3 class="text-lg font-bold">{title}</h3>
            <div class="inline-flex gap-5 items-center mt-1">
                <a href="{githubLink}" class="fill-white w-8 h-8 hover:fill-gray-300 transition-colors">
                     <Github />
                </a>
                <a href="{webLink}">
                    <ExternalLink class="w-8 h-8 text-white hover:text-gray-300 transition-colors" />
                </a>
            </div>
        </div>
        <p class="items-center gap-4 text-xs text-gray-500">{category}</p>
        <p class="line-clamp-2 text-wrap text-sm">
            {description}
        </p>
        
    </div>
</div>