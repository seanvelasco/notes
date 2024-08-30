import katex from "katex"

export const block = (markdown: string) =>
    markdown.replace(/\$\$(.*?)\$\$/g, (_, equation) =>
        katex.renderToString(equation, {
            displayMode: true,
            output: "html"
        })
    )

export const inline = (markdown: string) =>
    markdown.replace(/\$([^$]+)\$/g, (_, equation) =>
        katex.renderToString(equation, {
            displayMode: false,
            output: "html",
            throwOnError: false
        })
    )

const latex = (markdown: string) => inline(block(markdown))

export default latex