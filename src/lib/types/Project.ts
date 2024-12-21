export interface Project {
    id: string;
    status: string;
    date_created: string;
    date_updated?: string;
    title: string;
    slug: string;
    summary?: string;
    image: string;
    github_url?: string;
    website_url?: string;
}