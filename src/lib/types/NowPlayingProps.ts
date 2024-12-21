export interface NowPlayingProps {
    album: Album;
    song: Song;
    artist: string | null;
    isPlaying: boolean;
}

interface Song {
    url: string | null;
    name: string | null;
}

interface Album {
    image: string | null;
    name: string | null;
}