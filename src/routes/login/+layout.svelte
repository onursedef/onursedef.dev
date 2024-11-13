<script lang="ts">
    let { children } = $props();
</script>

<main class="flex w-screen h-screen bg-slate-800 text-white justify-center items-center px-4 lg:px-0">
    {@render children()}
</main>