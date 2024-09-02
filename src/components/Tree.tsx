import { For, Show, createSignal } from "solid-js"
import { A, useLocation } from "@solidjs/router"
import Chevron from "./Chevron"
import { ALLOWED_FILES } from "~/lib/constants"
import styles from "./tree.module.css"
import type { Leaf, Branch, Tree } from "~/types"

const depth = (path: string) =>
	path.split("/").filter((path) => path).length - 1

const Leaf = (props: { leaf: Leaf }) => (
	<A
		style={{
			"--chevron-placeholder-with-padding":
				"calc(var(--chevron-placeholder) + 0.5rem)",
			"padding-left": `calc(${
				depth(props.leaf.path) === 0
					? 0
					: depth(props.leaf.path) + depth(props.leaf.path) * 0.25
			}rem + var(--chevron-placeholder-with-padding))`
		}}
		href={encodeURI(props.leaf.path)}
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
					"padding-left": `calc(${
						depth(props.branch.path) === 0
							? 0
							: depth(props.branch.path) +
							  depth(props.branch.path) * 0.25
					}rem)`
				}}
				class={styles.leaf}
				onclick={toggle}
			>
				<Chevron orientation={expanded() ? "bottom" : "right"} />
				<span class={styles.title}>{props.branch.title}</span>
			</button>
			<Show when={expanded() && props.branch.children}>
				{(children) => (
					<div
						class={styles.line}
						style={{
							"--chevron-placeholder": "1.25rem", // added owing to lack of chevron
							"--offset": `calc(${
								depth(props.branch.path) === 0
									? 0
									: depth(props.branch.path) +
									  depth(props.branch.path) * 0.25
							}rem + (var(--chevron-placeholder) / 2) + 0.5rem - 0.5px)`
						}}
					>
						<Branches tree={children()} />
					</div>
				)}
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
