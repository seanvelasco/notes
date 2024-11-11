export type Leaf = Node

export type Branch = {
	children?: Tree
} & Leaf

export type Tree = Branch[]

export interface Storage {
	notes: () => Node[]
	index: () => unknown
	note: () => Promise<{
		title: string
		content?: string
	}>
}

export type Node = {
	title: string
	path: string
	children: Node[]
	extension: string
}
