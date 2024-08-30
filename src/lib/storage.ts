"use server"
import { createStorage } from "unstorage"
import driver from "unstorage/drivers/github"
import type { Node } from "~/types"
import { ALLOWED_FILES } from "~/lib/constants"

const createDirectoryTree = (paths: string[]) => {
	const tree: Node[] = []

	for (const path of paths) {
		let currentNode = tree
		const parts = path.split(":")
		for (const part of parts) {
			const existingNode = currentNode.find((node) => node.title === part)
			if (existingNode) {
				currentNode = existingNode.children
			} else {
				const nodePath = `/${parts
					.slice(0, parts.indexOf(part) + 1)
					.join("/")}`

				const node = {
					title: part,
					path: nodePath,
					children: []
				}
				currentNode.push(node)
				currentNode = node.children
			}
		}
	}
	return tree
}

const traverseToDepth = (nodes: Node[], depth: number): Node[] => {
	const [node] = nodes
	if (depth === 0 || nodes.length === 0) return nodes
	return traverseToDepth(node.children, depth - 1)
}

const options = {
	repo: "seanvelasco/notes-storage",
	branch: "main",
	dir: "/",
	token: import.meta.env.VITE_GITHUB_KEY
}

const storage = createStorage({ driver: driver(options) })

export const note = async (path: string) => {
	const content = await storage.getItem<string>(decodeURIComponent(path) + ALLOWED_FILES.MD)
	if (content === undefined || content === null) return
	return { content }
}

export const index = async (path: string) => {
	path = decodeURIComponent(path)
	path = path.slice(1).replaceAll('/', ':')
	const depth = path.split(':').length
	const notes = await storage.getKeys(path)
	if (!notes.length) return
	let filtered = notes.filter((note) => note.endsWith(ALLOWED_FILES.MD))
	filtered = filtered.map((note) => note.replace(ALLOWED_FILES.MD, ""))
	const tree = createDirectoryTree(filtered)
	const [branch] = traverseToDepth(tree, depth - 1)
	return branch.children
}

export const root = async () => {
	const notes = await storage.getKeys()
	let filtered = notes.filter((note) => note.endsWith(ALLOWED_FILES.MD))
	filtered = filtered.map((note) => note.replace(ALLOWED_FILES.MD, ""))
	return createDirectoryTree(filtered)
}