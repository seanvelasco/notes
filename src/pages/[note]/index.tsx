import { Show } from "solid-js"
import { createAsync } from "@solidjs/router"
import snarkdown from "snarkdown"
import styles from "./styles.module.css"
import { useStorage } from "../../lib/storage"

const getNote = (): string => ""

export const loadNote = () => getNote()

const Markdown = (props: { markdown: string }) => (
	<div class={styles.content} innerHTML={snarkdown(props.markdown)} />
)

const NotePage = () => {
	const storage = useStorage()
	const note = createAsync(storage.note)

	return (
		<div class={styles.note}>
			<Show when={note()}>
				{(note) => <Markdown markdown={note()} />}
			</Show>
		</div>
	)
}

export default NotePage
