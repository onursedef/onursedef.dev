import { currentTrackData, getTokenData, setTokenData, setTrackData } from "$lib/redis";
import { NowPlayingStore } from "$lib/stores/NowPlayingStore.svelte";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const tokenData = await getTokenData();

    if (!tokenData || tokenData.expires_in === null || tokenData.expires_in < Date.now()) {
        const refreshTokenReq = await fetch("/api", { method: "POST", });

        if (!refreshTokenReq.ok) {
            console.error("Failed to refresh token. Status: " + refreshTokenReq.status);
        } else {
            const refreshTokenData = await refreshTokenReq.json();
            await setTokenData({
                access_token: refreshTokenData.access_token,
                expires_in: Date.now() + refreshTokenData.expires_in * 1000,
                refresh_token: tokenData.refresh_token
            });
            tokenData.access_token = refreshTokenData.access_token;
            tokenData.expires_in = Date.now() + refreshTokenData.expires_in * 1000;
        }
    }

    const nowPlayingReq = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            "Authorization": "Bearer " + tokenData.access_token
        }
    });

    if (!nowPlayingReq.ok && nowPlayingReq.status !== 204) {
        console.error("Failed to fetch now playing. Status: " + nowPlayingReq.status);
        const trackData = await currentTrackData();
        if (trackData.isPlaying) {
            await setTrackData({
                album: trackData.album,
                song: trackData.song,
                artist: trackData.artist,
                isPlaying: false
            });
        }
        return json(JSON.parse(JSON.stringify(trackData)), {
            status: 200
        });
    }

    if (nowPlayingReq.status === 204) {
        NowPlayingStore.isPlaying = false;
        const trackData = await currentTrackData();
        if (trackData.isPlaying) {
            await setTrackData({
                album: trackData.album,
                song: trackData.song,
                artist: trackData.artist,
                isPlaying: false
            });
        }
        return json(JSON.parse(JSON.stringify(trackData)), {
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

        await setTrackData({
            album: NowPlayingStore.album,
            song: NowPlayingStore.song,
            artist: NowPlayingStore.artist,
            isPlaying: NowPlayingStore.isPlaying
        });

        const trackData = await currentTrackData();

        return json(JSON.parse(JSON.stringify(trackData)), {
            status: 200
        });
    }

    const trackData = await currentTrackData();

    return json(JSON.parse(JSON.stringify(trackData)), {
        status: 200
    });
}