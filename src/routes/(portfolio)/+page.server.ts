import { getPosts, type Posts } from '$lib/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const posts: Posts = await getPosts();

    return {
        posts
    }
}