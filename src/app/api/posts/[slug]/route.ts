import { Post } from "@/lib/types/Post";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { createHighlighter } from "shiki";
import TurndownService from "turndown";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const apiEndpoint = process.env.API_ENDPOINT;
    const apiKey = await fetch('http://localhost:3000/api/auth', {
        method: 'POST'
    }).then(res => res.json()).then(data => data.authToken);

    const query = `
    query {
        postBy(slug: "${slug}") {
            author {
                node {
                    avatar(size: 512) {
                        url
                    }
                    firstName,
                    lastName
                }
            },
            title,
            slug,
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

    var turndownService = new TurndownService({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        fence: '```',
    });
    var content = turndownService.turndown(apiRes.data.postBy.content);

    const hightlighter = await createHighlighter({
        themes: ['nord'],
        langs: ['typescript', 'javascript', 'java', 'c#', 'http', 'json', 'css', 'scss', 'html', 'xml', 'markdown', 'yaml', 'bash', 'shell', 'plaintext', 'go', 'rust']
    });

    const marked = new Marked(
        markedHighlight({
            async: true,
            highlight: async (code: string, lang: string) => {
                if (!hightlighter) return code;
                return hightlighter.codeToHtml(code, {
                    lang,
                    theme: 'nord',
                });
            }
        })
    )

    content = await marked.parse(content);

    let post: Post = {
        title: apiRes.data.postBy.title,
        slug: apiRes.data.postBy.slug,
        description: apiRes.data.postBy.excerpt,
        content: content,
        modifiedAt: apiRes.data.postBy.modifiedGmt,
        createdAt: apiRes.data.postBy.dateGmt,
        author: {
            avatarUrl: apiRes.data.postBy.author.node.avatar.url,
            firstName: apiRes.data.postBy.author.node.firstName,
            lastName: apiRes.data.postBy.author.node.lastName
        },
        featuredImage: {
            altText: apiRes.data.postBy.featuredImage.node.altText,
            sourceUrl: apiRes.data.postBy.featuredImage.node.sourceUrl
        }
    }

    return new Response(JSON.stringify(post), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}