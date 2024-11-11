import Markdown from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import katex from 'katex'

const parser = Markdown({
	linkify: true
})

const normalizeLang = (md: Markdown) => {
	const defaultFence = md.renderer.rules.fence
	if (defaultFence) {
		md.renderer.rules.fence = (tokens, idx, options, env, self) => {
			const token = tokens[idx]
			if (token.info) {
				token.info = token.info.toLowerCase()
			}
			return defaultFence(tokens, idx, options, env, self)
		}
	}
}

const block = (markdown: string) =>
	markdown.replace(/\$\$(.*?)\$\$/g, (_, equation) =>
		katex.renderToString(equation, {
			displayMode: true,
			output: 'html',
			throwOnError: false
		})
	)

const inline = (markdown: string) =>
	markdown.replace(/\$([^$]+)\$/g, (_, equation) =>
		katex.renderToString(equation, {
			displayMode: false,
			output: 'html',
			throwOnError: false
		})
	)

const latex = (markdown: string) => inline(block(markdown))

const shiki = await Shiki({
	themes: { light: 'github-light-default', dark: 'github-dark-default' }
})

parser.use(shiki).use(normalizeLang)

const markdown = (md: string) => latex(parser.render(md))

export default markdown
