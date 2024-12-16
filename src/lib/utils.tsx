import Redis from "ioredis";

export const calculateTimeToRead = (content: string): number => {
    const wordsPerMinute = 200;
    const numberOfWords = content.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
}

export const currentTrackData = async () => {
    var redis = new Redis(process.env.REDIS_URL as string);

    var spotifyData = await redis.get("spotifyData");

    return spotifyData;
}

export const setSpotifyData = async (data: any) => {
    var redis = new Redis(process.env.REDIS_URL as string);

    await redis.set("spotifyData", JSON.stringify(data));
}