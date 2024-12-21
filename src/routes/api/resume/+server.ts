import { getResume } from "$lib/directus";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const result = await getResume();
    return json(result);
}