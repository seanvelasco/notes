import { error } from '@sveltejs/kit'
import { note, index } from '$lib/storage'
import markdown from '$lib/markdown'
import tokenize from '$lib/tokenize'
import { allowed } from '$lib/constants'

export const load = async ({ url, params }) => {
	const title = decodeURIComponent(params.notes).split('/').pop()
	const file = await note(url.pathname)
	if (!file) {
		const tree = await index(url.pathname)
		if (!tree) error(404)
		return {
			title,
			index: tree
		}
	}
	if (file.extension !== 'md') {
		return {
			title,
			extension: file.extension
		}
	}
	if (!allowed.includes(file.extension)) {
		error(400, { message: `.${file.extension} files not allowed` })
	}
	if (file.content !== undefined) {
		return {
			title,
			body: markdown(file.content),
			extension: file.extension,
			...tokenize(file.content)
		}
	}
}
