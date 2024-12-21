export const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const textLength = content.split(' ').length;
    const minutes = textLength / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} min read`;
}

export function replaceCodeBlocks(content: string) {
    const codeBlockRegex = /```([a-z]+)?\n([\s\S]*?)\n```/g;

    return content.replace(codeBlockRegex, (match, lang, code) => {
        const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<div class="code-block" data-lang="${lang || 'plaintext'}" data-code="${encodeURIComponent(escapedCode)}"></div>`;
    });
}
