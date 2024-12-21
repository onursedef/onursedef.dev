import type { PageServerLoad } from "./$types";
import { getPosts, type Posts } from "$lib/directus";

export const load: PageServerLoad = async () => {
    const posts: Posts = await getPosts();

    return {
        posts
    }
}