import { getProjects } from "$lib/directus";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const result = await getProjects();

    return json(result);
}