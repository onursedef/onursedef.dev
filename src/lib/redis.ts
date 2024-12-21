import { env } from "$env/dynamic/private"
import Redis from "ioredis"
import type { NowPlayingProps } from "./types/NowPlayingProps";
import type { SpotifyToken } from "./types/SpotifyToken";

export const currentTrackData = async () => {
    const redis = new Redis(env.REDIS_URL as string);
    const trackData: NowPlayingProps = await redis.get("currentTrackData").then((data) => {
        return JSON.parse(data as string);
    });

    redis.quit();

    return trackData;
}

export const setTrackData = async (trackData: NowPlayingProps) => {
    const redis = new Redis(env.REDIS_URL as string);
    await redis.set("currentTrackData", JSON.stringify(trackData));
    redis.quit();
}

export const setTokenData = async (tokenData: SpotifyToken) => {
    const redis = new Redis(env.REDIS_URL as string);
    await redis.set("tokenData", JSON.stringify(tokenData));
    redis.quit();
}

export const getTokenData = async () => {
    const redis = new Redis(env.REDIS_URL as string);
    const tokenData: SpotifyToken = await redis.get("tokenData").then((data) => {
        return JSON.parse(data as string);
    });

    redis.quit();

    return tokenData;
}