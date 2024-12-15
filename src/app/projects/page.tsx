import type { Project, Projects } from '@/lib/types/Project';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { ProjectCard } from '@/components/atomic/ProjectCard';

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
    const data = await fetch(`${process.env.APP_URL}/api/projects`);
    let projects: Projects | null;

    try {
        projects = await data.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        projects = null;
    }

    return projects
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