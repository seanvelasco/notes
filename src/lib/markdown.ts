import Markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import latex from './latex'
import "katex/dist/katex.min.css"

const parser = Markdown({
    linkify: true,
})

const lowercaseLang = (md: Markdown) => {
    const defaultFence = md.renderer.rules.fence
    if (defaultFence) {
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            if (token.info) {
                token.info = token.info.toLowerCase()
            }
            return defaultFence(tokens, idx, options, env, self);
        }
    }
}

const shiki = await Shiki({ themes: { light: 'github-light-default', dark: 'github-dark-default' } })

const markdown = (md: string) => {
    parser
        .use(shiki)
        .use(lowercaseLang)

    return latex(parser.render(md))
}

export default markdown
