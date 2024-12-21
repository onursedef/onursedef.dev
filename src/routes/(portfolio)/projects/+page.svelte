<script lang="ts">
	import { page } from "$app/stores";
	import ProjectCard from "$lib/components/atomic/ProjectCard.svelte";
    import { LayoutStore } from "$lib/stores/LayoutStore.svelte";

    LayoutStore.title = "Projects";
    LayoutStore.backgroundImage = "/taksim.png";

    const { data } = $page;
</script>

<div class="mt-6 flex flex-col gap-5">
    {#each data.projects as project}
        <ProjectCard project={project} />
    {/each}
</div>