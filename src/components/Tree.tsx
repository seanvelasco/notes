import { For, Show, createSignal } from "solid-js"
import { A, useLocation } from "@solidjs/router"
// import Chevron from "./Chevron"
import styles from "./tree.module.css"
import type { Leaf, Branch, Tree } from "../types"
import { ALLOWED_FILES } from "~/lib/constants"

const depth = (path: string) =>
	path.split("/").filter((path) => path).length - 1

const Leaf = (props: { leaf: Leaf }) => (
	<A
		style={{
			"padding-left": `${depth(props.leaf.path)}rem`
		}}
		href={props.leaf.path.replace(ALLOWED_FILES.MD, "")}
		class={styles.leaf}
		activeClass="activeNote"
		end={true}
	>
		<span class={styles.title}>
			{props.leaf.title.replace(ALLOWED_FILES.MD, "")}
		</span>
	</A>
)

const Branch = (props: { branch: Branch }) => {
	const location = useLocation()

	const [expanded, setExpanded] = createSignal(
		location.pathname.includes(props.branch.path)
	)

	const toggle = () => setExpanded(!expanded())

	return (
		<>
			<button
				style={{
					"padding-left": `${depth(props.branch.path)}rem`
				}}
				class={styles.leaf}
				onclick={toggle}
			>
				{/* <Chevron orientation={expanded() ? "bottom" : "right"} /> */}
				<span class={styles.title}>{props.branch.title}</span>
			</button>
			<Show when={expanded() && props.branch.children}>
				{(children) => <Branches tree={children()} />}
			</Show>
		</>
	)
}

const Branches = (props: { tree: Tree }) => (
	<For each={props.tree}>
		{(branch) => (
			<Show
				when={branch?.children?.length}
				fallback={<Leaf leaf={branch} />}
			>
				<Branch branch={branch} />
			</Show>
		)}
	</For>
)

const Tree = (props: { tree: Tree }) => (
	<div class={styles.tree}>
		<Branches tree={props.tree} />
	</div>
)

export default Tree
