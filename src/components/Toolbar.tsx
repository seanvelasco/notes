import { Show, type JSXElement } from "solid-js"
import styles from "./Toolbar.module.css"

const Toolbar = (props: { children: JSXElement }) => (
	<div class={styles.toolbar}>{props.children}</div>
)

export default Toolbar
