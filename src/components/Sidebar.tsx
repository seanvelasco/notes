import { JSXElement } from "solid-js"
import styles from "./sidebar.module.css"

const Sidebar = (props: { children: JSXElement }) => (
	<aside class={styles.sidebar}>{props.children}</aside>
)

export default Sidebar
