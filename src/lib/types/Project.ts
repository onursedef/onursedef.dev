import { Author } from "./Author";
import { FeaturedImage } from "./FeaturedImage";

export interface Projects {
    projects: Project[];
}

export interface Project {
    title: string;
    description: string;
    githubUrl: string;
    websiteUrl: string;
    author: Author;
    featuredImage: FeaturedImage;
}