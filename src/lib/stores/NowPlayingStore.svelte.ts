import { type NowPlayingProps } from "$lib/types/NowPlayingProps";

export const NowPlayingStore = $state<NowPlayingProps>({
    album: {
        image: null,
        name: null
    },
    song: {
        url: null,
        name: null
    },
    artist: null,
    isPlaying: false
})