export type Leaf = {
    title: string
    path: string
}

export type Branch = {
    children?: Tree
} & Leaf

export type Tree = Branch[]