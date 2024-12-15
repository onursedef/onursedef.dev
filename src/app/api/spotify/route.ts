import queryString from 'query-string';

export async function GET(request: Request) {
    var client_id = process.env.SPOTIFY_CLIENT_ID;
    var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    // generate random string for state
    var state = Math.random().toString(16).substring(7);

    return Response.redirect("https://accounts.spotify.com/authorize?" +
        queryString.stringify({
            response_type: "code",
            client_id: client_id,
            scope: "user-read-private user-read-email user-read-currently-playing",
            redirect_uri: "http://localhost:3000/api/spotify/callback",
            state: state
        }));
}