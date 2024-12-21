import { redirect, type RequestHandler } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async () => {
    const client_id = env.SPOTIFY_CLIENT_ID;

    const state = Math.random().toString(16).substring(7);

    return redirect(302, "https://accounts.spotify.com/authorize?" + new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        scope: "user-read-currently-playing",
        redirect_uri: env.APP_URL + "/api/spotify/callback",
        state: state
    }));
}