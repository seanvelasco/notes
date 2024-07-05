import { type JSXElement } from "solid-js"
import styles from "./Canvas.module.css"

const Canvas = (props: { children: JSXElement }) => (
	<div class={styles.page}>
		<div class={styles.content}>{props.children}</div>
	</div>
)

export default Canvas
