<script lang="ts">
	import { createProgress, melt } from '@melt-ui/svelte';
	import { ChevronDown, TrendingUp } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	let { title, description, oldData, data, dataDescription, dataColor } = $props<{
		title: string;
		description: string;
		oldData: number;
		data: number;
		dataDescription: string;
		dataColor: 'green' | 'red' | 'orange';
	}>();

	const value = writable(oldData);

	const {
		elements: { root },
		options: { max }
	} = createProgress({
		value: data,
		max: 100
	});

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	sleep(1000).then(() => {
		value.set(75);
	});
</script>

<div class="flex w-full flex-col gap-3 border border-slate-700 bg-slate-800 p-3">
	<div class="inline-flex items-start justify-between">
		<div class="flex flex-col">
			<h4 class="text-xs text-gray-300">{title}</h4>
			<h2 class="text-2xl font-bold">{description}</h2>
		</div>
		<div class="inline-flex gap-1">
			<p class="text-sm text-gray-400">Last 7 days</p>
			<ChevronDown class="h-5 w-5 text-gray-400" />
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="inline-flex items-center justify-between">
			<p class="text-sm">{dataDescription}</p>
			<div class="inline-flex items-center gap-1">
				<TrendingUp class="h-5 w-5 text-{dataColor}-500" />
				<p class="text-sm text-{dataColor}-500">{data}</p>
			</div>
		</div>
		<div use:melt={$root} class="relative h-1 w-full overflow-hidden rounded-full bg-black/40">
			<div
				class="h-full w-full bg-green-500 transition-transform duration-[660ms]
                    ease-[cubic-bezier(0.65,0,0.35,1)]"
				style={`transform: translateX(-${100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}
			></div>
		</div>
	</div>
</div>
