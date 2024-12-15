import { Post } from "@/lib/types/Post";
import { calculateTimeToRead } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface PostCardProps {
    post: Post
}

export const PostCard = ({ post }: PostCardProps) => {

    var formattedDate = new Date(post.modifiedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    var formattedTimeToRead = calculateTimeToRead(post.content) + " min read";

    return (
        <div className="group/post w-full p-4 bg-neutral-900/50 border-2 border-neutral-700 rounded-lg flex items-center gap-4 hover:bg-neutral-900 hover:border-neutral-600 transition-colors">
            <div className="flex relative w-44 h-32 rounded-lg flex-shrink-0">
                <Image
                    src={post.featuredImage.sourceUrl}
                    alt="Taksim"
                    width={1331}
                    height={1000}
                    className="w-44 h-32 rounded-lg object-cover z-10" />
                <Image
                    src={post.featuredImage.sourceUrl}
                    alt="Taksim"
                    width={1331}
                    height={1000}
                    className="absolute top-0 left-0 right-0 bottom-0 w-44 h-32 rounded-lg object-cover invisible group-hover/post:visible group-hover/post:blur-md duration-300 transition-all opacity-25" />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/35 rounded-lg group-hover/post:bg-neutral-900/0 transition-colors z-20"></div>
            </div>
            <div className="flex flex-col items-start justify-evenly h-32">
                <div className="flex relative">
                    <a href={`/blog/${post.slug}`} className="text-2xl text-indigo-300 z-10">{post.title}</a>
                    <h3 className="absolute top-0 left-0 text-2xl text-indigo-600 invisible group-hover/post:visible group-hover/post:blur-md duration-300 transition-all opacity-75 pointer-events-none">{post.title}</h3>
                </div>
                <div
                    className="text-base text-neutral-300 line-clamp-3"
                    aria-label={{ __html: post.description }.toString()}
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />
                <p className="text-sm text-neutral-400">{formattedDate} • {formattedTimeToRead}</p>
            </div>
        </div>
    )
}