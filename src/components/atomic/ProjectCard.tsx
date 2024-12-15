import { Project } from "@/lib/types/Project";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { AppWindowMac } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {

    return (
        <div className="group/post w-full p-4 bg-neutral-900/50 border-2 border-neutral-700 rounded-lg flex items-center gap-4 hover:bg-neutral-900 hover:border-neutral-600 transition-colors">
            <div className="flex relative w-44 h-32 rounded-lg flex-shrink-0">
                <Image
                    src={project.featuredImage.sourceUrl}
                    alt={project.featuredImage.altText}
                    width={1331}
                    height={1000}
                    className="w-44 h-32 rounded-lg object-cover z-10" />
                <Image
                    src={project.featuredImage.sourceUrl}
                    alt={project.featuredImage.altText}
                    width={1331}
                    height={1000}
                    className="absolute top-0 left-0 right-0 bottom-0 w-44 h-32 rounded-lg object-cover invisible group-hover/post:visible group-hover/post:blur-md duration-300 transition-all opacity-25" />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/35 rounded-lg group-hover/post:bg-neutral-900/0 transition-colors z-20"></div>
            </div>
            <div className="flex flex-col items-start justify-evenly h-32">
                <div className="flex relative">
                    <h1 className="text-2xl text-indigo-300 z-10">{project.title}</h1>
                    <h3 className="absolute top-0 left-0 text-2xl text-indigo-600 invisible group-hover/post:visible group-hover/post:blur-md duration-300 transition-all opacity-75 pointer-events-none">{project.title}</h3>
                </div>
                <div
                    className="text-base text-neutral-300 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                />
                <div className="flex gap-2 items-center">
                    <a href={project.githubUrl} className="text-sm text-neutral-400">
                        <SiGithub className="w-5 h-5" />
                    </a>
                    <a href={project.websiteUrl} className="text-sm text-neutral-400">
                        <AppWindowMac className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    )
}