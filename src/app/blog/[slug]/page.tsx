import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import type { Post } from "@/lib/types/Post";
import { calculateTimeToRead } from "@/lib/utils";
import { ResolvingMetadata, type Metadata } from "next";
import React from "react";
import { Login } from "@/lib/types/Login";
import TurndownService from "turndown";
import { createHighlighter } from "shiki";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

export async function generateMetadata({
    params
}: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = await params;

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const api_endpoint = process.env.API_ENDPOINT;

    let query = `mutation {
                login( input: {
                  clientMutationId: "uniqueId",
                  username: "${username}",
                  password: "${password}"
                } ) {
                  authToken
                  user {
                      id
                      name
                  }
                }
              }`

    var apiReq = await fetch(api_endpoint as string, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!apiReq.ok) {
        const text = await apiReq.text();
        console.error(`API Error [${apiReq.status}]:`, text);
        return {
            title: 'Error',
        };
    }

    let apiRes;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return {
            title: 'Error',
        };
    }

    if (apiRes.errors) {
        console.error("API Error:", apiRes.errors);
        return {
            title: 'Error',
        };
    }

    var loginData: Login = {
        authToken: apiRes.data.login.authToken,
        user: apiRes.data.login.user
    }

    query = `
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

    apiReq = await fetch(api_endpoint as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.authToken}`
        },
        body: JSON.stringify({ query })
    });

    if (!apiReq.ok && apiReq.status !== 403) {
        const text = await apiReq.text();
        console.error(`API Error [${apiReq.status}]:`, text);
        return {
            title: 'Error',
        }
    }

    apiRes = null;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return {
            title: 'Error',
        }
    }

    if (apiRes.errors) {
        console.error("API Error:", apiRes.errors);
        return {
            title: 'Error',
        }
    }


    let post: Post = {
        title: apiRes.data.postBy.title,
        slug: apiRes.data.postBy.slug,
        description: apiRes.data.postBy.excerpt,
        content: apiRes.data.postBy.content,
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

    // const post: Post = await data.json();

    return {
        title: post?.title,
        description: post?.description,
        openGraph: {
            title: post?.title,
            description: post?.description,
            images: [
                {
                    url: post?.featuredImage.sourceUrl ?? '',
                    width: 1331,
                    height: 1000,
                    alt: post?.featuredImage.altText,
                },
            ],
            siteName: "Onur Sedef",
        },
        twitter: {
            card: "summary_large_image",
            title: post?.title,
            description: post?.description,
            images: [
                post?.featuredImage.sourceUrl ?? '',
            ],
            creator: "@onursedef",
        },
        alternates: {
            canonical: `https://onursedef.com/blog/${post?.slug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        keywords: ['website', 'nextjs', 'react', 'web development'],
    }
}

async function getPost({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const api_endpoint = process.env.API_ENDPOINT;

    let query = `mutation {
                login( input: {
                  clientMutationId: "uniqueId",
                  username: "${username}",
                  password: "${password}"
                } ) {
                  authToken
                  user {
                      id
                      name
                  }
                }
              }`

    var apiReq = await fetch(api_endpoint as string, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!apiReq.ok) {
        const text = await apiReq.text();
        console.error(`API Error [${apiReq.status}]:`, text);
        return null
    }

    let apiRes;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return null
    }

    if (apiRes.errors) {
        console.error("API Error:", apiRes.errors);
        return null
    }

    var loginData: Login = {
        authToken: apiRes.data.login.authToken,
        user: apiRes.data.login.user
    }

    query = `
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

    apiReq = await fetch(api_endpoint as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.authToken}`
        },
        body: JSON.stringify({ query })
    });

    if (!apiReq.ok && apiReq.status !== 403) {
        const text = await apiReq.text();
        console.error(`API Error [${apiReq.status}]:`, text);
        return null
    }

    apiRes = null;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return null
    }

    if (apiRes.errors) {
        console.error("API Error:", apiRes.errors);
        return null
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

    return post
}

export default async function Post({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const post = await getPost({ params });

    var formattedDate = post !== null ? new Date(post.modifiedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    var formattedTimeToRead = post != null ? calculateTimeToRead(post.content) + " min read" : '';

    return (
        <DefaultLayout isHome={false} title={post?.title}>
            {post && (
                <React.Fragment>
                    <Image src={post.featuredImage.sourceUrl} width={1331} height={1000} className="w-full aspect-auto rounded-md shadow-md shadow-black/50 md:mt-0 mt-12" alt={post.featuredImage.altText} />
                    <div className="mt-6 w-full">
                        <h1 className="text-3xl">{post.title}</h1>
                        <div className="flex gap-2 items-center max-h-14 mt-4">
                            <Image src={post.author.avatarUrl} width={512} height={512} className="w-14 h-14 rounded-full" alt={""} />
                            <div className="flex flex-col justify-evenly">
                                <p>Onur Sedef</p>
                                <p className="text-sm text-neutral-400">Software Developer</p>
                                <p className="text-sm text-neutral-400">{formattedDate} • {formattedTimeToRead}</p>
                            </div>
                        </div>
                        <div className="mt-6 prose prose-invert max-w-3xl w-full leading-normal break-words prose-pre:m-0 prose-pre:border-none prose-pre:font-jetbrains prose-code:font-jetbrains prose-code:text-base prose-pre:bg-transparent" dangerouslySetInnerHTML={{ __html: post.content }}>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </DefaultLayout>
    )
}