export interface Post {
	id: number;
	title: string;
	image: string;
	shortDescription: string;
	description: string;
	tags: PostTag[];
	category: string;
	views: number;
	createdAt: string;
	updatedAt: string;
}

export interface PostTag {
	id: number;
	name: string;
}
