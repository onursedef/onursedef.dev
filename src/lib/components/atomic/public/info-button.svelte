<script lang="ts">
	import { Loader } from 'lucide-svelte';

	let { onclick, disabled, loading, children } = $props<{
		onclick: () => void;
		disabled: boolean;
		loading: boolean;
		children: any;
	}>();
</script>

{#if disabled}
	<button
		disabled
		class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-800"
	>
		{@render children()}
	</button>
{:else if loading}
	<button
		disabled
		class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-800"
	>
		<Loader class="h-5 w-5 animate-spin text-white" />
		<div class="ml-2 inline-flex items-center">
			{@render children()}
		</div>
	</button>
{:else}
	<button
		class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-800"
	>
		{@render children()}
	</button>
{/if}
