import { create } from "zustand";

interface SpotifyData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

interface SpotifyStoreProps {
    spotifyData: SpotifyData;
    setSpotifyData: (data: SpotifyData) => void;
}

const useSpotifyStore = create<SpotifyStoreProps>(set => ({
    spotifyData: {
        access_token: "",
        expires_in: 0,
        refresh_token: "",
    },
    setSpotifyData: (data) => set({ spotifyData: data }),
}))

export default useSpotifyStore;