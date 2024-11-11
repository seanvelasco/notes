import { createStorage } from 'unstorage'
import driver from 'unstorage/drivers/github'
import { ALLOWED_FILES, allowed } from './constants'
import type { Node } from '../types'
import { env } from '$env/dynamic/private'

const getExtension = (filePath: string) => {
	const fileNameWithExtension = filePath.split(/[/\\]/).pop() as string
	const [, ...extensionParts] = fileNameWithExtension.split('.')
	const extension = extensionParts.join('.')
	return extension
}

const traverseToDepth = (nodes: Node[], depth: number): Node[] => {
	const [node] = nodes
	if (depth === 0 || nodes.length === 0) return nodes
	return traverseToDepth(node.children, depth - 1)
}

const options = {
	repo: env.GITHUB_REPO as string,
	branch: env.GITHUB_BRANCH || 'main',
	dir: env.GITHUB_DIR || '/',
	token: env.GITHUB_KEY as string
}

const storage = createStorage({ driver: driver(options) })

export const index = async (path: string) => {
	path = decodeURIComponent(path)
	path = path.slice(1).replaceAll('/', ':')
	const depth = path.split(':').length
	const notes = await storage.getKeys(path)
	if (!notes.length) return
	let filtered = notes.filter((note) => note.endsWith(ALLOWED_FILES.MD))
	filtered = filtered.map((note) => note.replace(ALLOWED_FILES.MD, ''))
	const tree = createDirectoryTree(filtered)
	const [branch] = traverseToDepth(tree, depth - 1)
	return branch.children
}

export const note = async (path: string) => {
	const keys = await storage.getKeys()
	const paths = keys.map((key) => {
		const pathname = key.split(':').join('/')
		const [path, ...extensions] = pathname.split('.')
		const extension = extensions.join('.')
		return { path: `/${path}`, extension }
	})
	const found = paths.find((p) => p.path === decodeURIComponent(path))
	if (found) {
		if (found.extension === 'md') {
			const content = await storage.getItem<string>(`${found.path}.${found.extension}`)
			if (content === undefined || content === null) return
			return {
				content,
				extension: found.extension
			}
		} else {
			return {
				extension: found.extension
			}
		}
	}
}

const createDirectoryTree = (paths: string[]) => {
	const tree: Node[] = []
	for (const path of paths) {
		let currentNode = tree
		const parts = path.split(/[:/\\]/)
		let accumulatedPath = ''
		parts.forEach((part, index) => {
			const isFile = index === parts.length - 1
			const [filename, ...extensions] = part.split('.')
			const extension = isFile ? extensions.join('.') : undefined
			accumulatedPath = `${accumulatedPath}/${filename}`
			let existingNode = currentNode.find(
				(node) => node.title === filename && node.extension === extension
			)
			if (!existingNode) {
				const newNode: Node = {
					title: filename,
					path: accumulatedPath,
					children: [],
					extension: extension as string
				}
				currentNode.push(newNode)
				existingNode = newNode
			}
			currentNode = existingNode.children
		})
	}
	return tree
}

export const root = async () => {
	const keys = await storage.getKeys()
	const files = keys
		.map((note) => {
			const extension = getExtension(note)
			if (allowed.includes(extension)) {
				return note
			}
		})
		.filter((note) => note !== undefined)
	return createDirectoryTree(files)
}
