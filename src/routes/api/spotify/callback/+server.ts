import { env } from "$env/dynamic/private";
import { setTokenData } from "$lib/redis";
import { SpotifyStore } from "$lib/stores/SpotifyStore.svelte";
import type { SpotifyToken } from "$lib/types/SpotifyToken";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!state) {
        return redirect(302, new URL("/#", url).toString() + "?" + new URLSearchParams({
            error: "internal_error"
        }));
    }

    const client_id = env.SPOTIFY_CLIENT_ID
    const client_secret = env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret) {
        return redirect(302, new URL("/#", url).toString() + "?" + new URLSearchParams({
            error: "internal_error"
        }));
    }

    const data = new URLSearchParams({
        "code": code as string,
        "redirect_uri": env.APP_URL + "/api/spotify/callback",
        "grant_type": "authorization_code",
    });

    const apiReq = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
        },
        body: data
    });

    if (!apiReq.ok) {
        const text = await apiReq.text();
        return redirect(302, new URL("/#", url).toString() + "?" + new URLSearchParams({
            error: "internal_error",
            message: text
        }));
    }

    let apiRes;

    try {
        apiRes = await apiReq.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
        const text = await apiReq.text();
        return redirect(302, new URL("/#", url).toString() + "?" + new URLSearchParams({
            error: "internal_error",
            message: text
        }));
    }

    if (apiRes.error) {
        return redirect(302, new URL("/#", url).toString() + "?" + new URLSearchParams({
            error: "internal_error",
            message: apiRes.error
        }));
    }

    const spotifyData: SpotifyToken = {
        access_token: apiRes.access_token,
        refresh_token: apiRes.refresh_token,
        expires_in: new Date().getTime() + (apiRes.expires_in as number) * 1000
    }

    SpotifyStore.access_token = spotifyData.access_token;
    SpotifyStore.refresh_token = spotifyData.refresh_token;
    SpotifyStore.expires_in = spotifyData.expires_in;

    await setTokenData(spotifyData);

    return redirect(302, new URL("/", url).toString());
}