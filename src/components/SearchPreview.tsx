import { createSignal, For, type JSXElement, onMount, Show } from "solid-js"
import { A, useSearchParams } from "@solidjs/router"
import styles from "./SearchPreview.module.css"
import treeStyles from "./tree.module.css"
import type { Tree, Branch } from "~/types"

// const Match = (props: { entry: Branch }) => <div>{props.entry.title}</div>

// const Matches = (props: { branch: Branch }) => (
// 	<div>
// 		<For each={props.branch.children}>
// 			{(entry) => <Match entry={entry} />}
// 		</For>
// 	</div>
// )

const Entry = (props: { branch: Branch }) => {
	return (
		<Show when={props.branch.children?.length}>
			<A
				href={props.branch.path}
				class={treeStyles.leaf}
				style={{
					"padding-left": "1rem"
				}}
			>
				<span class={styles.title}>{props.branch.title}</span>
				<span class={styles.count}>
					{props.branch.children!.length}
				</span>
			</A>
		</Show>
	)
}

const SearchPreview = (props: { children: JSXElement; tree: Tree }) => {
	const [ref, setRef] = createSignal<HTMLDialogElement>()
	const [searchParams, setSearchParams] = useSearchParams()
	const [query, setQuery] = createSignal(searchParams.search)
	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value
		setQuery(value)
		setSearchParams({ search: value })
	}
	onMount(() => {
		if (query()) ref()?.showModal()
	})
	return (
		<>
			<dialog ref={setRef} class={styles.dialog}>
				<div class={styles.container}>
					<div class={styles.header}>
						<input
							value={query()}
							class={styles.input}
							type="search"
							placeholder="Search..."
							onInput={onInput}
						/>
					</div>
					<Show when={query()}>
						<div class={styles.results}>
							<For each={props.tree}>
								{(branch) => <Entry branch={branch} />}
							</For>
						</div>
					</Show>
				</div>
			</dialog>
			<button onclick={() => ref()?.showModal()}>{props.children}</button>
		</>
	)
}

export default SearchPreview
