<script lang="ts">
	import { Search, Bell } from 'lucide-svelte';
	import Potrait from '../../../assets/images/potrait.jpg';
</script>

<div class="flex h-20 w-full items-center border-b-2 border-slate-600 bg-slate-800 shadow-lg">
	<div class="mx-auto inline-flex w-full max-w-6xl items-center justify-between">
		<div class="inline-flex items-center gap-2 rounded-md border-2 border-slate-600 px-2">
			<Search class="h-5 w-5 text-slate-400" />
			<input
				type="text"
				class="w-64 border-none bg-transparent text-sm focus:border-none focus:outline-none focus:ring-0"
				placeholder="Search..."
			/>
		</div>
		<div class="inline-flex items-center gap-4">
			<button class="relative">
				<div
					class="absolute -right-1 -top-2 inline-flex h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75"
				></div>
				<div class="full absolute -right-1 -top-2 h-2 w-2 rounded bg-red-500"></div>
				<Bell class="h-6 w-6 text-slate-400" />
			</button>
			<div>
				<img src={Potrait} alt="Potrait" class="h-10 w-10 rounded-md object-cover" />
			</div>
		</div>
	</div>
</div>
