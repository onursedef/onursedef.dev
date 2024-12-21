<script lang="ts">
	import Icon from "@iconify/svelte";

    let { filename, content } = $props<{ filename: string; content: string }>();

    let lang = filename.split(".").pop();
</script>

<div class="w-full flex flex-col items-start justify-start flex-shrink-0 bg-gradient-to-r from-teal-400/5 to-blue-500/15 rounded-lg border-2 border-neutral-700">
    <div class="relative w-full flex items-center px-3 py-2 rounded-t-lg bg-neutral-900/40">
      <div class="flex gap-2 items-center">
        <div class="w-[10px] h-[10px] bg-red-400 rounded-full block hover:bg-red-500 transition-colors"></div>
        <div class="w-[10px] h-[10px] bg-yellow-400 rounded-full block hover:bg-yellow-500 transition-colors"></div>
        <div class="w-[10px] h-[10px] bg-green-400 rounded-full block hover:bg-green-500 transition-colors"></div>
      </div>
      <div class="font-nunito text-sm absolute left-0 right-0 flex justify-center items-center gap-1 w-full">
        <p>{filename}</p>
      </div>
      <button class="absolute right-2 top-8 z-10 bg-neutral-900/45 text-neutral-400 h-fit w-fit p-2 rounded-md hover:bg-neutral-900/65 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="scale-x-[-1]"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"/><path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3" opacity="0.5"/></g></svg>
      </button>
      <div>
        
      </div>
    </div>
    <pre class="relative h-full w-full overflow-auto m-0">
      <code class="w-full h-full overflow-auto font-jetbrains">
        {content}
      </code>
    </pre>
</div>