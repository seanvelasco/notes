import { type JSXElement } from "solid-js"
import styles from "./main.module.css"

const Main = (props: { children: JSXElement }) => (
	<main class={styles.main}>{props.children}</main>
)

export default Main
