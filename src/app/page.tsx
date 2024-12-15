import React from "react";
import { PostCard } from "@/components/atomic/PostCard";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Posts } from "@/lib/types/Post";

export const metadata = {
  title: {
    default: "Onur Sedef's Blog",
    template: "%s | Onur Sedef",
  },
  description: "Discover the projects, technical articles, and insights of Onur Sedef, a back-end developer specializing in .NET, Go, Rust, and modern web development. Follow the journey of a passionate developer creating tools like linqed-go and VTalkie.",
  openGraph: {
    title: "Onur Sedef's Blog",
    description: "Discover the projects, technical articles, and insights of Onur Sedef, a back-end developer specializing in .NET, Go, Rust, and modern web development. Follow the journey of a passionate developer creating tools like linqed-go and VTalkie.",
    images: [
      {
        url: "https://private-avatars.githubusercontent.com/u/40718231?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQzMDM2MDAsIm5iZiI6MTczNDMwMjQwMCwicGF0aCI6Ii91LzQwNzE4MjMxIn0.k1enuPDtULw54bShiF02YJ88xVa3m8ykXgi2QofSy2M&v=4",
        width: 800,
        height: 600,
        alt: "Onur Sedef's Blog",
      },
    ],
    site_name: "Onur Sedef's Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onur Sedef's Blog",
    description: "Discover the projects, technical articles, and insights of Onur Sedef, a back-end developer specializing in .NET, Go, Rust, and modern web development. Follow the journey of a passionate developer creating tools like linqed-go and VTalkie.",
    images: [
      "https://private-avatars.githubusercontent.com/u/40718231?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQzMDM2MDAsIm5iZiI6MTczNDMwMjQwMCwicGF0aCI6Ii91LzQwNzE4MjMxIn0.k1enuPDtULw54bShiF02YJ88xVa3m8ykXgi2QofSy2M&v=4",
    ],
    creator: "@onursedef",
  },
  alternates: {
    canonical: "https://onursedef.com",
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

async function getPosts() {
  const data = await fetch(`${process.env.APP_URL}/api/posts`);
  const posts: Posts = await data.json();

  return posts
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <DefaultLayout
      isHome={true}>
      <div className="inline-flex w-full items-end justify-between">
        <h2 className="text-3xl">Blog</h2>
        <div className="group/see-more relative">
          <a href="/blog" className="text-indigo-500 text-base z-10">see more</a>
          <p className="absolute top-0 left-0 right-0 bottom-0 text-indigo-400 opacity-0 text-base invisible group-hover/see-more:opacity-100 group-hover/see-more:visible group-hover/see-more:blur-md pointer-events-none transition-all">see more</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5">
        {posts.posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </DefaultLayout>
  );
}
