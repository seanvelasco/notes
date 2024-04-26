import { For } from "solid-js"
import styles from "./table.module.css"

const Table = (props: { chapters: string[] }) => {
	return (
		<section>
			<span class={styles.label}>On this page</span>
			<For each={props.chapters}>{(chapter) => <a>{chapter}</a>}</For>
		</section>
	)
}

export default Table
