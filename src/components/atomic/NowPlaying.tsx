"use server";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { setSpotifyData, currentTrackData } from "@/lib/utils";

interface NowPlaying {
    albumName: string;
    albumImage: string;
    songName: string;
    artistName: string;
}

export async function getNowPlaying() {
    const spotifyData = await currentTrackData();

    if (!spotifyData) {
        return null;
    }

    const tokenData = JSON.parse(spotifyData as string);

    // Get now playing
    const nowPlayingRequest = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            "Authorization": `Bearer ${tokenData.access_token}`
        }
    });

    if (!nowPlayingRequest.ok && nowPlayingRequest.status !== 204) {
        console.error("Failed to fetch now playing");
        return null;
    }

    if (nowPlayingRequest.status === 204) {
        return null;
    }

    const response = await nowPlayingRequest.json();

    if (!response) {
        return null;
    }

    if (nowPlayingRequest.ok && response && response.item) {
        return {
            albumName: response.item.album.name,
            albumImage: response.item.album.images[0].url,
            songName: response.item.name,
            artistName: response.item.artists.length > 1
                ? response.item.artists
                    .map((artist: any) => artist.name).join(", ")
                : response.item.artists[0].name
        };
    }

    return null;
}

export const NowPlaying = async () => {
    const nowPlaying = await getNowPlaying();

    return (
        <React.Fragment>
            {nowPlaying && (
                <div className={`flex items-center gap-3`}>
                    <div className="group relative w-16 h-16">
                        <div className="opacity-0 absolute p-2 -top-12 right-1/2 translate-x-1/2 bg-neutral-800/70 rounded-md z-20 whitespace-nowrap w-max backdrop-blur-md group-hover:opacity-100 transition-all">
                            <p>{nowPlaying.albumName}</p>
                        </div>
                        <Image src={nowPlaying.albumImage} alt="Taksim" width={"640"} height={"640"} className="w-full h-full rounded-md object-cover" />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/50 rounded-md z-0"></div>
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex gap-1 items-center justify-center z-10">
                            <div className="w-1 h-4 bg-neutral-200 block bar"></div>
                            <div className="w-1 h-10 bg-neutral-200 block bar"></div>
                            <div className="w-1 h-6 bg-neutral-200 block bar"></div>
                            <div className="w-1 h-8 bg-neutral-200 block bar"></div>
                            <div className="w-1 h-5 bg-neutral-200 block bar"></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-evenly h-full whitespace-nowrap">
                        <p className="text-xs text-neutral-400">Now Playing:</p>
                        <p className="text-neutral-200">{nowPlaying.songName}</p>
                        <p className="text-neutral-300 text-sm">{nowPlaying.artistName}</p>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}