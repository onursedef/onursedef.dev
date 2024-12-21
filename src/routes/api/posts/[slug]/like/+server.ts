import { likePost } from "$lib/directus";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const { id } = await request.json();
    const result = await likePost(id);

    return json(result);
}