<script lang="ts">
	import { Eye, Tags } from 'lucide-svelte';

	let {
		slug,
		title,
		category = null,
		description = null,
		image,
		views,
		tags = null,
		date = null,
		readTime = null,
		size
	} = $props<{
		slug: string;
		title: string;
		category: string | null;
		description: string | null;
		image: string;
		views: number;
		tags: string[] | null;
		date: string | null;
		readTime: string | null;
		size: 'small' | 'medium' | 'large';
	}>();
</script>

{#if size === 'small'}
	<div class="flex w-full items-center gap-2 hover:bg-slate-800/65 p-2 rounded-lg">
		<img src={image} alt="placeholder" class="h-20 w-24 flex-shrink-0 rounded-xl object-cover" />
		<div>
			<a aria-label="{title}" href={slug} class="line-clamp-2 text-lg font-bold hover:underline">{title}</a>
			<p class="text-sm text-gray-500">Date</p>
		</div>
	</div>
{:else if size === 'medium'}
	<div class="flex flex-col lg:flex-row gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/65">
		<a href="" class="aspect-[3/2] h-28"
			><img src={image} alt="placeholder" class="aspect-[3/2] rounded-lg object-cover" /></a
		>
		<div class="flex flex-col gap-2">
			<div>
				<a href={slug} class="text-lg font-bold line-clamp-2">
					{title}
				</a>
				<div class="inline-flex items-center gap-4 text-xs text-gray-500">
					<p class=" text-gray-500">{category}</p>
					<div class="hidden lg:inline-flex items-center gap-2">
						<Tags class="h-3 w-3" />
						<p>{tags.map((tag: string) => tag).join(', ')}</p>
					</div>
					<div class="hidden lg:inline-flex items-center gap-2 text-gray-500">
						<Eye class="h-3 w-3" />
						<p>{views}</p>
					</div>
					<div class="hidden lg:inline-flex items-center gap-2 text-gray-500">
						<p>{date}</p>
					</div>
					<div class="hidden lg:inline-flex items-center gap-2 text-gray-500">
						<p>{readTime}</p>
					</div>
				</div>
			</div>
			<p class="line-clamp-3 lg:line-clamp-2 text-wrap text-sm">
				{description}
			</p>
		</div>
	</div>
{:else if size === 'large'}
	<a href={slug} class="relative w-full lg:w-3/5">
		<div
			class="absolute bottom-0 left-0 right-0 top-0 flex items-end gap-2 rounded-2xl bg-gradient-to-t from-black/35 to-transparent p-4 transition-all hover:from-black/60"
		>
			<div class="flex flex-col">
				<h2 class="line-clamp-2 text-2xl font-bold text-white">{title}</h2>
				<div class="inline-flex items-center gap-2 text-sm text-gray-300">
					<Eye class="h-5 w-5" />
					{views}
				</div>
			</div>
		</div>
		<img src={image} alt="placeholder" class="aspect-[3/2] lg:h-full w-full rounded-2xl object-cover" />
	</a>
{/if}
