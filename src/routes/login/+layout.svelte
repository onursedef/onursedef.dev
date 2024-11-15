<script lang="ts">
	let { children } = $props();
</script>

<main
	class="flex h-screen w-screen items-center justify-center bg-slate-800 px-4 text-white lg:px-0"
>
	{@render children()}
</main>
