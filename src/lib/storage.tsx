import {
	createContext,
	useContext,
	createSignal,
	onMount,
	type JSXElement
} from "solid-js"
import { createStorage } from "unstorage"
import driver from "unstorage/drivers/github"
import { useLocation } from "@solidjs/router"

interface Storage {
	notes: () => Node[]
	note: () => Promise<string>
}

type Node = {
	title: string
	path: string
	children: Node[]
}

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

const StorageContext = createContext<Storage>()

const StorageProvider = (props: { children: JSXElement }) => {
	const github = createStorage({
		driver: driver({
			repo: "seanvelasco/notes-storage",
			branch: "main",
			dir: "/"
		})
	})

	const [notes, setNotes] = createSignal<Node[]>([])

	const note = () => {
		const location = useLocation()
		return github.getItem(location.pathname) as Promise<string>
	}

	onMount(async () => {
		let notes = await github.getKeys()
		setNotes(createDirectoryTree(notes))
	})

	const storage = {
		notes,
		note
	}

	return (
		<StorageContext.Provider value={storage}>
			{props.children}
		</StorageContext.Provider>
	)
}

const useStorage = () => {
	const storage = useContext(StorageContext!)

	if (!storage) {
		throw new Error("useStorage must be used within a StorageProvider")
	}

	return storage
}

export { StorageProvider, useStorage }
