<script lang="ts">
	import { Loader } from "lucide-svelte";

    let {
        onclick,
        disabled,
        loading,
        children,
    } = $props<{
        onclick: () => void;
        disabled: boolean;
        loading: boolean;
        children: any;
    }>();
</script>

{#if disabled}
<button disabled class="inline-flex items-center bg-red-600 px-4 py-2 rounded-md transition-colors hover:bg-red-800">
    {@render children()}
</button>
{:else if loading}
<button disabled class="inline-flex items-center bg-red-600 px-4 py-2 rounded-md transition-colors hover:bg-red-800">
    <Loader class="h-5 w-5 text-white animate-spin" />
    <div class="ml-2 inline-flex items-center">
        {@render children()}
    </div>
</button>
{:else}
<button class="inline-flex items-center bg-red-600 px-4 py-2 rounded-md transition-colors hover:bg-red-800">
    {@render children()}
</button>
{/if}