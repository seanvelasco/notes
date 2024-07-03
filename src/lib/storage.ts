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
	token: import.meta.env.VITE_GITHUB_TOKEN
}

const storage = createStorage({ driver: driver(options) })

export const note = async (pathname: string) => {
	const path = decodeURIComponent(pathname)
	const title = path.split("/").pop() || ''
	const content = await storage.getItem<string>(path + ALLOWED_FILES.MD)
	if (content === undefined || content === null) return { title }
	return { title, content }
}

export const index = async (pathname: string) => {
	let path = decodeURIComponent(pathname)
	path = path.slice(1).replaceAll('/', ':')
	const depth = path.split(':').length
	let notes = await storage.getKeys(path)
	if (!notes.length) return
	notes = notes.filter((note) => note.endsWith(ALLOWED_FILES.MD))
	notes = notes.map((note) => note.replace(ALLOWED_FILES.MD, ""))
	const tree = createDirectoryTree(notes)
	const [branch] = traverseToDepth(tree, depth - 1)
	return branch.children
}

export const root = async () => {
	let notes = await storage.getKeys()
	notes = notes.filter((note) => note.endsWith(ALLOWED_FILES.MD))
	notes = notes.map((note) => note.replace(ALLOWED_FILES.MD, ""))
	return createDirectoryTree(notes)
}

