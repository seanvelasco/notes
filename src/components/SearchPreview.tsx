import { createSignal, For, Show } from "solid-js"
import { useSearchParams } from "@solidjs/router"
import Chevron from "~/components/Chevron"
import styles from './SearchPreview.module.css'
import treeStyles from './tree.module.css'
import type { Tree, Branch } from "~/types"

const Match = (props: { entry: Branch }) => (
	<div>
		{props.entry.title}
	</div>
)

const Matches = (props: { branch: Branch }) => (
	<div>
		<For each={props.branch.children}>
			{(entry) =>
				<Match entry={entry} />
			}
		</For>
	</div>
)

const PageMatchesGroup = (props: { branch: Branch }) => {
	const [open, setOpen] = createSignal(false)
	const toggle = () => setOpen(!open())
	return (
		<Show when={props.branch.children?.length}>
			<div class={treeStyles.leaf}>
				<button class={treeStyles.chevron} onclick={toggle}>
					<Chevron orientation={open() ? "bottom" : "right"}/>
				</button>
				<span class={styles.title}>{props.branch.title}</span>
				<span class={styles.count}>{props.branch.children!.length}</span>
			</div>
			<Show when={open()}>
				<Matches branch={props.branch} />
			</Show>
		</Show>
	)
}

const SearchPreview = (props: { tree: Tree }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [query, setQuery] = createSignal(searchParams.search)
	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value
		setQuery(value)
		setSearchParams({ search: value })
	}
	return (
		<>
			<div class={styles.header}>
				<input class={styles.input} type="search" placeholder="Search..." onInput={onInput} />
			</div>
			<Show when={query()}>
				<div class={styles.container}>
					<For each={props.tree}>
						{(branch) => (
							<PageMatchesGroup branch={branch}/>
						)}
					</For>
				</div>
			</Show>
		</>
	)
}

export default SearchPreview