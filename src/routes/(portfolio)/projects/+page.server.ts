import { getProjects, type Projects } from '$lib/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const projects: Projects = await getProjects();

    return {
        projects
    }
}