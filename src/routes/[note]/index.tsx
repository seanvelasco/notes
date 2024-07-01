import { Show, Suspense } from "solid-js"
import { createAsync } from "@solidjs/router"
import snarkdown from "snarkdown"
import styles from "./styles.module.css"
import { useStorage } from "../../lib/storage"

const getNote = (): string => ""

export const loadNote = () => getNote()

const Markdown = (props: { markdown: string }) => (
	<div class={styles.content} innerHTML={snarkdown(props.markdown)} />
)

const Spinner = () => <p>loading ,,,</p>

const NotePage = () => {
	const storage = useStorage()
	const note = createAsync(storage.note)

	return (
		<Suspense fallback={<Spinner />}>
			<div class={styles.note}>
				<Show when={note()}>
					{(note) => (
						<Suspense fallback={<Spinner />}>
							<Markdown markdown={note()} />
						</Suspense>
					)}
				</Show>
			</div>
		</Suspense>
	)
}

export default NotePage
