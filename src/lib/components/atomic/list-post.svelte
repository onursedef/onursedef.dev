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
	<div class="flex w-full items-center gap-2">
		<img src={image} alt="placeholder" class="h-20 w-24 flex-shrink-0 rounded-xl object-cover" />
		<div>
			<a href={slug} class="line-clamp-2 text-lg font-bold hover:underline">{title}</a>
			<p class="text-sm text-gray-500">Date</p>
		</div>
	</div>
{:else if size === 'medium'}
	<div class="flex gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/65">
		<a href="" class="aspect-1 h-32"
			><img src={image} alt="placeholder" class="aspect-1 rounded-lg object-cover" /></a
		>
		<div class="flex flex-col justify-between">
			<div>
				<a href={slug} class="text-xl font-bold">
					{title}
				</a>
				<p class="mt-1 text-sm text-gray-500">{category}</p>
			</div>
			<p class="line-clamp-2 text-wrap text-sm">
				{description}
			</p>
			<div class="inline-flex items-center gap-4 text-sm text-gray-500">
				<div class="inline-flex items-center gap-2">
					<Tags class="h-5 w-5" />
					<p>{tags.map((tag: string) => tag).join(', ')}</p>
				</div>
				<div class="inline-flex items-center gap-2 text-gray-500">
					<Eye class="h-5 w-5" />
					<p>{views}</p>
				</div>
				<div class="inline-flex items-center gap-2 text-gray-500">
					<p>{date}</p>
				</div>
				<div class="inline-flex items-center gap-2 text-gray-500">
					<p>{readTime}</p>
				</div>
			</div>
		</div>
	</div>
{:else if size === 'large'}
	<a href={slug} class="relative w-3/5">
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
		<img src={image} alt="placeholder" class="h-full w-full rounded-2xl object-cover" />
	</a>
{/if}
