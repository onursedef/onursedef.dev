import { NowPlayingStore } from "$lib/stores/NowPlayingStore.svelte";
import { SpotifyStore } from "$lib/stores/SpotifyStore.svelte";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const spotifyStore = SpotifyStore;

    if (spotifyStore.access_token === null) {
        return json({
            error: "no_access_token",
        }, {
            status: 401
        });
    }

    const nowPlayingReq = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            "Authorization": "Bearer " + spotifyStore.access_token
        }
    });

    if (!nowPlayingReq.ok && nowPlayingReq.status !== 204) {
        console.error("Failed to fetch now playing. Status: " + nowPlayingReq.status);
        return json(JSON.parse(JSON.stringify(NowPlayingStore)), {
            status: 200
        });
    }

    if (nowPlayingReq.status === 204) {
        NowPlayingStore.isPlaying = false;
        return json(JSON.parse(JSON.stringify(NowPlayingStore)), {
            status: 200
        });
    }

    const response = await nowPlayingReq.json();

    if (!response) {
        return json(JSON.parse(JSON.stringify(NowPlayingStore)), {
            status: 200
        });
    }

    if (nowPlayingReq.ok && response && response.item) {
        NowPlayingStore.album = {
            image: response.item.album.images[0].url,
            name: response.item.album.name
        };
        NowPlayingStore.song = {
            url: response.item.external_urls.spotify,
            name: response.item.name
        }
        NowPlayingStore.artist = response.item.artists.map((artist: { name: string }) => artist.name).join(", ");
        NowPlayingStore.isPlaying = response.is_playing;
        return json(JSON.parse(JSON.stringify(NowPlayingStore)), {
            status: 200
        });
    }

    return json(JSON.parse(JSON.stringify(NowPlayingStore)), {
        status: 200
    });
}