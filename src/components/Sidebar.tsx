import { JSXElement } from "solid-js"
import styles from "./sidebar.module.css"

const Sidebar = (props: { children: JSXElement; background?: string }) => (
	<aside
		class={styles.sidebar}
		style={{
			background: props.background
		}}
	>
		{props.children}
	</aside>
)

export default Sidebar
