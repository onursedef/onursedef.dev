import type { Project, Projects } from '@/lib/types/Project';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { ProjectCard } from '@/components/atomic/ProjectCard';
import { Login } from '@/lib/types/Login';

export const metadata = {
    title: 'Projects | Onur Sedef',
    description: 'Discover the projects I have worked on. From open-source projects to personal projects, find out more about the tools I have built.',
    openGraph: {
        title: 'Projects | Onur Sedef',
        description: 'Discover the projects I have worked on. From open-source projects to personal projects, find out more about the tools I have built.',
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
        title: 'Projects | Onur Sedef',
        description: 'Discover the projects I have worked on. From open-source projects to personal projects, find out more about the tools I have built.',
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

async function getProjects() {
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
  projects {
    nodes {
      author {
        node {
          firstName
          lastName
          avatar {
            url
          }
        }
      }
      excerpt
      title
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      githubUrls(first: 1) {
          nodes {
            name
        	}
      }
      websiteUrls(first: 1) {
        nodes {
          name
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

    apiRes;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return null;
    }

    var projects: Projects = {
        projects: []
    };

    for (let project of apiRes.data.projects.nodes) {
        projects.projects.push({
            title: project.title,
            description: project.excerpt,
            githubUrl: project.githubUrls.length > 0 ? project.githubUrls[0].name : '',
            websiteUrl: project.websiteUrls.length > 0 ? project.websiteUrls[0].name : '',
            author: {
                firstName: project.author.node.firstName,
                lastName: project.author.node.lastName,
                avatarUrl: project.author.node.avatar.url
            },
            featuredImage: {
                altText: project.featuredImage.node.altText,
                sourceUrl: project.featuredImage.node.sourceUrl
            }
        })
    }

    return projects;
}

export default async function Projects() {
    const data = await getProjects();
    return (
        <DefaultLayout isHome={false} title={'Projects'}>
            <div className="mt-6 flex flex-col gap-5">
                {data != null && data?.projects.map((project: Project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </DefaultLayout>
    )
}