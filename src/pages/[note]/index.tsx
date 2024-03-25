import { Show } from "solid-js"
import snarkdown from "snarkdown"
import styles from "./styles.module.css"

const getNote = (): string => ""

export const loadNote = () => getNote()

const Markdown = (props: { markdown: string }) => (
	<div innerHTML={snarkdown(props.markdown)} />
)

const NotePage = (props: { data?: string }) => {
	return (
		<div class={styles.note}>
			<div class={styles.content}>
				<Show when={props.data}>
					{(markdown) => <Markdown markdown={markdown()} />}
				</Show>
			</div>
		</div>
	)
}

export default NotePage
