import Redis from "ioredis";
import queryString from "query-string";

export async function GET(request: Request) {
    var redis = new Redis(process.env.REDIS_URL as string);

    var spotifyData = await redis.get("spotifyData");

    if (spotifyData && JSON.parse(spotifyData).expires_in < new Date().getTime()) {

        var data = new URLSearchParams();
        data.append("refresh_token", JSON.parse(spotifyData).refresh_token);
        data.append("grant_type", "refresh_token");

        var apiReq = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`
            },
        });

        if (!apiReq.ok) {
            const text = await apiReq.text();
            console.error(`Spotify API Error [${apiReq.status}]:`, text);
            return Response.json({ error: "api_error", status: apiReq.status });
        }

        let apiRes;
        try {
            apiRes = await apiReq.json();
        } catch (err) {
            const text = await apiReq.text();
            console.error("API response was not JSON:", text);
            return Response.json({ error: "invalid_response" });
        }

        if (apiRes.error) {
            return Response.json({ error: apiRes.error });
        } else {
            var newData = {
                access_token: apiRes.access_token,
                expires_in: new Date().getTime() + apiRes.expires_in * 1000,
                refresh_token: JSON.parse(spotifyData).refresh_token,
            };

            await redis.set("spotifyData", JSON.stringify(newData));

            return Response.json(newData);
        }
    }

    return Response.json(JSON.parse(spotifyData as string));
}