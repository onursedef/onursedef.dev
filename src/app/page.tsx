import React from "react";
import { PostCard } from "@/components/atomic/PostCard";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Posts } from "@/lib/types/Post";
import { Login } from "@/lib/types/Login";

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
    return null;
  }

  let apiRes;

  try {
    apiRes = await apiReq.json();
  } catch (err) {
    const text = await apiReq.text();
    console.error("API response was not JSON:", text);
    return null;
  }

  if (apiRes.errors) {
    console.error("API Error:", apiRes.errors);
    return null;
  }

  var loginData: Login = {
    authToken: apiRes.data.login.authToken,
    user: apiRes.data.login.user
  }

  query = `
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
    return null;
  }

  apiRes = null;

  try {
    apiRes = await apiReq.json();
  } catch (err) {
    const text = await apiReq.text();
    console.error("API response was not JSON:", text);
    return null;
  }

  if (apiRes.errors) {
    console.error("API Error:", apiRes.errors);
    return null;
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
        {posts && posts.posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </DefaultLayout>
  );
}
