export type Leaf = {
    title: string
    path: string
}

export type Branch = {
    children?: Tree
} & Leaf

export type Tree = Branch[]

export interface Storage {
    notes: () => Node[]
    index: () => any
    note: () => Promise<{
        title: string,
        content?: string
    }>
}

export type Node = {
    title: string
    path: string
    children: Node[]
}

