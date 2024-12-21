import { env } from "$env/dynamic/private";
import { getTokenData, setTokenData } from "$lib/redis";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const tokenData = await getTokenData();


    if (tokenData.expires_in != null && (tokenData.expires_in as number) < new Date().getTime()) {
        const data = new URLSearchParams();
        data.append("grant_type", "refresh_token");
        data.append("refresh_token", tokenData.refresh_token as string);

        const apiReq = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET)
            },
            body: data
        });

        if (!apiReq.ok) {
            return json({
                status: 500,
                body: {
                    error: "internal_error",
                    message: await apiReq.text()
                }
            }, {
                status: 500
            });
        }

        let apiRes;

        try {
            apiRes = await apiReq.json();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: unknown) {
            return json({
                status: 500,
                body: {
                    error: "internal_error",
                    message: await apiReq.text()
                }
            }, {
                status: 500
            });
        }

        if (apiRes.error) {
            return json({
                status: 500,
                body: {
                    error: "internal_error",
                    message: apiRes.error
                }
            }, {
                status: 500
            });
        }

        tokenData.access_token = apiRes.access_token;
        tokenData.expires_in = new Date().getTime() + apiRes.expires_in * 1000;
        tokenData.refresh_token = apiRes.refresh_token;

        await setTokenData(tokenData);

        return json({
            status: 200,
            body: {
                access_token: apiRes.access_token,
                expires_in: apiRes.expires_in,
                refresh_token: apiRes.refresh_token
            }
        }, {
            status: 200
        });
    }

    return json({
        status: 200,
        body: {
            access_token: tokenData.access_token,
            expires_in: (tokenData.expires_in as number) - new Date().getTime(),
            refresh_token: tokenData.refresh_token
        }
    }, {
        status: 200
    });
}