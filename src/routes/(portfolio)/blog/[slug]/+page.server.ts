import { getPost } from "$lib/directus";
import { Marked } from "marked";
import type { PageServerLoad } from "./$types";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    const post = await getPost(slug);

    const marked = new Marked(
        markedHighlight({
            async: true,
            highlight: (code, lang) => {
                const filename = lang;
                lang = lang.split('.').pop() as string;
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                const highlightedCode = hljs.highlight(code, { language }).value;
                lang = lang === 'tsx' || lang === 'jsx' ? 'react' : lang;
                const element = `<div class="w-full h-fit flex flex-col items-start justify-start flex-shrink-0 bg-gradient-to-r from-teal-400/5 to-blue-500/10 rounded-lg border-2 border-neutral-800">
<div class="relative w-full flex items-center px-3 py-2 rounded-t-lg bg-neutral-900/40">
<div class="flex gap-2 items-center">
<div class="w-[10px] h-[10px] bg-red-400 rounded-full block hover:bg-red-500 transition-colors"></div>
<div class="w-[10px] h-[10px] bg-yellow-400 rounded-full block hover:bg-yellow-500 transition-colors"></div>
<div class="w-[10px] h-[10px] bg-green-400 rounded-full block hover:bg-green-500 transition-colors"></div>
</div>
<div class="font-nunito text-sm absolute left-0 right-0 flex justify-center items-center gap-1 w-full h-fit">
<iconify-icon icon="vscode-icons:file-type-${lang}" class="*:size-6"></iconify-icon>
<p>${filename}</p>
</div>
<div></div>
</div>
<div class="h-fit w-full overflow-auto px-3 pb-2 text-left flex justify-center">
<code class="w-full h-min text-sm font-jetbrains">
${highlightedCode}
</code>
</div>
</div>`
                return element;
            },
        }),
    )

    post.content = await marked.parse(post.content);

    if (post) {
        return {
            post
        }
    }
};