import { Posts } from "@/lib/types/Post";

export async function GET(request: Request) {
    const apiEndpoint = process.env.API_ENDPOINT;
    const apiKey = await fetch(`${process.env.APP_URL}/api/auth`, {
        method: 'POST'
    }).then(res => res.json()).then(data => data.authToken);

    const query = `
    query {
        posts {
            nodes {
                author {
                    node {
                        avatar {
                            url
                        }
                        firstName,
                        lastName
                    }
                },
                title,
                slug,
                excerpt,
                content,
                modifiedGmt,
                dateGmt,
                featuredImage {
                    node {
                        altText
                        sourceUrl
                    }
                }
            }
        }
    }`

    const apiReq = await fetch(apiEndpoint as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ query })
    });

    if (!apiReq.ok && apiReq.status !== 403) {
        const text = await apiReq.text();
        console.error(`API Error [${apiReq.status}]:`, text);
        return new Response("Internal Server Error", { status: 500 });
    }

    let apiRes;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return new Response("Internal Server Error", { status: 500 });
    }

    if (apiRes.errors) {
        console.error("API Error:", apiRes.errors);
        return new Response("Internal Server Error", { status: 500 });
    }

    var posts: Posts = {
        posts: []
    };

    for (let post of apiRes.data.posts.nodes) {
        posts.posts.push({
            title: post.title as string,
            slug: post.slug as string,
            description: post.excerpt as string,
            content: post.content as string,
            modifiedAt: post.modifiedGmt as string,
            createdAt: post.dateGmt as string,
            author: {
                avatarUrl: post.author.node.avatar.url as string,
                firstName: post.author.node.firstName as string,
                lastName: post.author.node.lastName as string
            },
            featuredImage: {
                altText: post.featuredImage.node.altText as string,
                sourceUrl: post.featuredImage.node.sourceUrl as string
            }
        });
    }

    return new Response(JSON.stringify(posts), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}