import Redis from "ioredis";
import queryString from "query-string";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!state) {
        return Response.redirect(new URL("/#", request.url).toString() + "?" + queryString.stringify({ error: "state_mismatch" }));
    }

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!client_id || !client_secret) {
        console.error("Missing client_id or client_secret");
        return Response.redirect(new URL("/#", request.url).toString() + "?" + queryString.stringify({ error: "internal_error" }));
    }

    // Use URLSearchParams for x-www-form-urlencoded
    var data = new URLSearchParams();
    data.append("code", code as string);
    data.append("redirect_uri", `${process.env.APP_URL}/api/spotify/callback`);
    data.append("grant_type", "authorization_code");

    var apiReq = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(client_id + ":" + client_secret).toString('base64')}`
        },
    });

    if (!apiReq.ok) {
        const text = await apiReq.text();
        console.error(`Spotify API Error [${apiReq.status}]:`, text);
        return Response.redirect(new URL("/#", request.url).toString() + "?" + queryString.stringify({ error: "api_error", status: apiReq.status }));
    }

    let apiRes;
    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return Response.redirect(new URL("/#", request.url).toString() + "?" + queryString.stringify({ error: "invalid_response" }));
    }

    if (apiRes.error) {
        return Response.redirect(new URL("/#", request.url).toString() + "?" + queryString.stringify({ error: apiRes.error }));
    } else {
        // store apiRes
        var spotifyData = {
            access_token: apiRes.access_token,
            expires_in: new Date().getTime() + apiRes.expires_in * 1000,
            refresh_token: apiRes.refresh_token,
        };

        var redis = new Redis(process.env.REDIS_URL as string);
        var savedData = await redis.set("spotifyData", JSON.stringify(spotifyData));

        console.log('savedData: ', savedData);

        return Response.redirect(new URL("/", request.url).toString() + "?" + queryString.stringify(apiRes));
    }
}
