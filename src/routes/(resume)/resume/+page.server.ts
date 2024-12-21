import { getResume } from "$lib/directus";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const resume = await getResume();

    return {
        resume
    }
}