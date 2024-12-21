import { env } from "$env/dynamic/private";
import { createDirectus, login, readItems, readSingleton, rest, staticToken, updateItem } from "@directus/sdk";

const directusClient = createDirectus(env.DIRECTUS_ENDPOINT).with(rest());

export async function getPosts() {
    const auth_token = await directusClient.request(login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD));

    const result = await directusClient.with(staticToken(auth_token.access_token as string)).request(readItems("post", {
        fields: ["*", { seo: ["*"], images: ["*"] }]
    }));

    return result;
}

export async function getPost(slug: string) {
    const auth_token = await directusClient.request(login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD));

    const result = await directusClient.with(staticToken(auth_token.access_token as string)).request(readItems("post", {
        fields: ["*", { seo: ["*"], images: ["*"], author: ["avatar", "first_name", "last_name"] }], // Make sure this field name matches your Directus setup
        filter: { slug: { _eq: slug } },
    }));

    return result[0];
}

export async function likePost(id: string) {
    const auth_token = await directusClient.request(login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD));

    const prevLikeCount = await directusClient.with(staticToken(auth_token.access_token as string)).request(readItems("post", {
        fields: ["like_count"],
        filter: { id: { _eq: id } }
    }));

    const result = await directusClient.with(staticToken(auth_token.access_token as string)).request(updateItem("post", id, {
        like_count: prevLikeCount[0].like_count + 1
    }));

    return result;
}

export async function viewPost(id: string) {
    const auth_token = await directusClient.request(login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD));

    const prevViewCount = await directusClient.with(staticToken(auth_token.access_token as string)).request(readItems("post", {
        fields: ["view_count"],
        filter: { id: { _eq: id } }
    }));

    const result = await directusClient.with(staticToken(auth_token.access_token as string)).request(updateItem("post", id, {
        view_count: prevViewCount[0].view_count + 1
    }));

    return result;
}

export async function getProjects() {
    const auth_token = await directusClient.request(login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD));

    const result = await directusClient.with(staticToken(auth_token.access_token as string)).request(readItems("projects", {
        fields: ["*", { images: ["*"] }]
    }));

    return result;
}

export async function getResume() {
    const auth_token = await directusClient.request(login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD));

    const result = await directusClient.with(staticToken(auth_token.access_token as string)).request(readSingleton("resume", {
        fields: ["*", { certificates: ["*"], educations: ["*"], experiences: ["*"], skils: ["*"], projects: ["*"], languages: ["*"] }]
    }));

    return result;
}


export type Posts = Awaited<ReturnType<typeof getPosts>>;
export type Projects = Awaited<ReturnType<typeof getProjects>>;