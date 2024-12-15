import { PostCard } from "@/components/atomic/PostCard";
import DefaultLayout from "@/components/layouts/DefaultLayout"
import { Post, Posts } from "@/lib/types/Post";

export const metadata = {
    title: 'Blog | Onur Sedef',
    description: 'Explore my latest blog posts. From technical articles to personal insights, find out more about the topics I write about.',
    openGraph: {
        title: 'Projects | Onur Sedef',
        description: 'Explore my latest blog posts. From technical articles to personal insights, find out more about the topics I write about.',
        images: [
            {
                url: 'https://private-avatars.githubusercontent.com/u/40718231?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQzMDM2MDAsIm5iZiI6MTczNDMwMjQwMCwicGF0aCI6Ii91LzQwNzE4MjMxIn0.k1enuPDtULw54bShiF02YJ88xVa3m8ykXgi2QofSy2M&v=4',
                width: 800,
                height: 600,
                alt: 'Projects',
            },
        ],
        siteName: 'Onur Sedef',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Onur Sedef',
        description: 'Explore my latest blog posts. From technical articles to personal insights, find out more about the topics I write about.',
        images: [
            'https://private-avatars.githubusercontent.com/u/40718231?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQzMDM2MDAsIm5iZiI6MTczNDMwMjQwMCwicGF0aCI6Ii91LzQwNzE4MjMxIn0.k1enuPDtULw54bShiF02YJ88xVa3m8ykXgi2QofSy2M&v=4',
        ],
        creator: '@onursedef',
    },
    alternates: {
        canonical: 'https://onursedef.com/projects',
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
};

async function getPosts() {
    const data = await fetch(`${process.env.APP_URL}/api/posts`);
    const posts: Posts = await data.json();

    return posts
}

export default async function Blog() {
    const data = await getPosts();
    return (
        <DefaultLayout isHome={false} title={'Blog'}>
            <div className="mt-6 flex flex-col gap-5">
                {data.posts.map((post: Post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </DefaultLayout>
    )
}