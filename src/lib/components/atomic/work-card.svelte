<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import Github from './icons/github.svelte';

	let { image, title, category, description, githubLink, webLink } = $props<{
		image: string;
		title: string;
		category: string;
		description: string;
		githubLink: string | null;
		webLink: string | null;
	}>();
</script>

<div class="flex flex-col gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/15 dark:hover:bg-slate-800/65">
	<img src={image} alt="placeholder" class="aspect-[3/2] w-full rounded-lg object-cover" />
	<div class="flex flex-col gap-1">
		<div class="inline-flex items-center justify-between">
			<h3 class="text-lg font-bold">{title}</h3>
			<div class="mt-1 inline-flex items-center gap-5">
				<a href={githubLink} class="h-5 w-5 fill-black dark:fill-white transition-colors dark:hover:fill-gray-300">
					<Github />
				</a>
				<a href={webLink}>
					<ExternalLink class="h-5 w-5 dark:text-white transition-colors dark:hover:text-gray-300" />
				</a>
			</div>
		</div>
		<p class="items-center gap-4 text-xs text-gray-500">{category}</p>
		<p class="line-clamp-3 text-wrap text-sm lg:line-clamp-2">
			{description}
		</p>
	</div>
</div>
