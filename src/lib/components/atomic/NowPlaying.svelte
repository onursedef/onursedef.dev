<script lang="ts">
	import { NowPlayingStore } from "$lib/stores/NowPlayingStore.svelte";
	import type { NowPlayingProps } from "$lib/types/NowPlayingProps";
	import { onMount } from "svelte";

    let nowPlaying = $state<NowPlayingProps>(NowPlayingStore);

    onMount(() => {
        fetch('/api/spotify/now-playing')
            .then(res => res.json())
            .then(data => {
                nowPlaying = data;
            })
            .catch(err => {
                console.error("Failed to load now playing:", err);
            });
    })

    $effect(() => {
        const interval = setInterval(() => {
            fetch('/api/spotify/now-playing')
                .then(res => res.json())
                .then(data => {
                    nowPlaying = data;
                })
                .catch(err => {
                    console.error("Failed to load now playing:", err);
                });
        }, 180000);

        return () => clearInterval(interval);
    })
</script>

{#if nowPlaying.album != null}
    <div class="flex items-center gap-3">
        <div class="group relative w-16 h-16">
            <div class="opacity-0 absolute p-2 -top-12 right-1/2 translate-x-1/2 bg-neutral-800/70 rounded-md z-20 whitespace-nowrap w-max backdrop-blur-md group-hover:opacity-100 transition-all
                    before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-neutral-800/70">
                {nowPlaying.album.name}
            </div>
            <img src="{nowPlaying.album.image}" alt="{nowPlaying.album.name}" class="w-full h-full rounded-md object-cover">
            <div class="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/50 rounded-md z-0"></div>
            <div class="absolute top-0 left-0 right-0 bottom-0 flex gap-1 items-center justify-center z-10">
                <div class="w-1 h-4 bg-neutral-200 block bar"></div>
                <div class="w-1 h-10 bg-neutral-200 block bar"></div>
                <div class="w-1 h-6 bg-neutral-200 block bar"></div>
                <div class="w-1 h-8 bg-neutral-200 block bar"></div>
                <div class="w-1 h-5 bg-neutral-200 block bar"></div>
            </div>
        </div>
        <div class="flex flex-col items-start justify-evenly h-full whitespace-nowrap">
            <p class="text-xs text-neutral-400">
                {#if nowPlaying.isPlaying}
                    Now Playing:
                {:else}
                    Last Played:
                {/if}
            </p>
            <a href="{nowPlaying.song.url}" class="text-neutral-200">{nowPlaying.song.name}</a>
            <p class="text-neutral-300 text-sm">{nowPlaying.artist}</p>
        </div>
    </div>
{/if}