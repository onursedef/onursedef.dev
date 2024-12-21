export interface Post {
    id: string;
    status: 'published' | 'draft' | 'archived';
    date_created: string;
    date_updated: string;
    content: string;
    slug: string;
    summary: string;
    featured_image: string;
    title: string;
    like_count: number;
    view_count: number;
    images: Image[];
    seo: Seo;
}

interface Image {
    id: number;
    post_id: string;
    directus_files_id: number;
}

interface Seo {
    id: number;
    meta_title: string;
    meta_description: string;
    canonical: string;
}