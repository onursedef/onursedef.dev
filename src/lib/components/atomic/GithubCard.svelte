<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<div class="group flex items-center overflow-x-clip relative p-4 bg-neutral-900/70 border-2 border-neutral-700 rounded-md w-full">
    <div class="flex flex-col gap-1 items-start">
        <p class="text-white pl-2">github/</p>
        <a href="https://github.com/onursedef" class="px-2 py-1 text-sm bg-white hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] rounded-full text-black transition-shadow">@onursedef</a>
    </div>
    <Icon icon="simple-icons:github" width={80} height={80} class="text-white size-20 absolute -right-3" />
    <Icon icon="simple-icons:github" width={80} height={80} class="text-white size-20 absolute -right-3 opacity-0 group-hover:blur-md group-hover:opacity-30 transition-all -z-10" />
</div>