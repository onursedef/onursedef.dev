import { getPost } from "$lib/directus";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const result = await getPost("introducing-linqed-go");

    return json(result);
}