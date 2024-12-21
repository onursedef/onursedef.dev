import type { SpotifyToken } from "$lib/types/SpotifyToken";

export const SpotifyStore = $state<SpotifyToken>({
    access_token: null,
    expires_in: null,
    refresh_token: null
});