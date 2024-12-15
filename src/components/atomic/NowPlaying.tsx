import React, { useEffect, useState } from "react";
import Image from "next/image";

interface NowPlaying {
    albumName: string;
    albumImage: string;
    songName: string;
    artistName: string;
}

export const NowPlaying = () => {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get access token
                const tokenRequest = await fetch("/api/spotify/token");
                if (!tokenRequest.ok) {
                    console.error("Failed to fetch token");
                    return;
                }
                const tokenData = await tokenRequest.json();

                console.log(tokenData);
                // Get now playing
                const nowPlayingRequest = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        "Authorization": `Bearer ${tokenData.access_token}`
                    }
                });

                if (!nowPlayingRequest.ok && nowPlayingRequest.status !== 204) {
                    console.error("Failed to fetch now playing");
                    return;
                }

                if (nowPlayingRequest.status === 204) {
                    setNowPlaying(null);
                    return;
                }

                const response = await nowPlayingRequest.json();

                if (!response) {
                    return;
                }

                if (nowPlayingRequest.ok && response && response.item) {
                    setNowPlaying({
                        albumName: response.item.album.name,
                        albumImage: response.item.album.images[0].url,
                        songName: response.item.name,
                        artistName: response.item.artists.length > 1
                            ? response.item.artists
                                .map((artist: any) => artist.name).join(", ")
                            : response.item.artists[0].name
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Set up an interval to fetch data every 30 seconds
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array since we're using setInterval

    if (!nowPlaying) {
        return null; // or a loading state
    }

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