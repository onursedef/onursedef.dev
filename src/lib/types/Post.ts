import { FeaturedImage } from "./FeaturedImage";
import { Author } from "./Author";

export interface Posts {
    posts: Post[];
}

export interface Post {
    title: string;
    slug: string;
    description: string;
    content: string;
    modifiedAt: string;
    createdAt: string;
    author: Author;
    featuredImage: FeaturedImage;
}