import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import type { Post } from "@/lib/types/Post";
import { calculateTimeToRead } from "@/lib/utils";
import { ResolvingMetadata, type Metadata } from "next";

export async function generateMetadata({
    params
}: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = await params;
    const data = await fetch(`${process.env.APP_URL}/api/posts/${slug}`);
    const post: Post = await data.json();

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: [
                {
                    url: post.featuredImage.sourceUrl,
                    width: 1331,
                    height: 1000,
                    alt: post.featuredImage.altText,
                },
            ],
            siteName: "Onur Sedef",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [
                post.featuredImage.sourceUrl,
            ],
            creator: "@onursedef",
        },
        alternates: {
            canonical: `https://onursedef.com/blog/${post.slug}`,
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
    const data = await fetch(`/api/posts/${slug}`);
    const post: Post = await data.json();

    return post
}

export default async function Post({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const post = await getPost({ params });

    var formattedDate = new Date(post.modifiedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    var formattedTimeToRead = calculateTimeToRead(post.content) + " min read";

    return (
        <DefaultLayout isHome={false} title={post.title}>
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
        </DefaultLayout>
    )
}