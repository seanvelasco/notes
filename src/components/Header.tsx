import { JSXElement } from "solid-js"
import styles from "./header.module.css"

const Header = (props: { children: JSXElement }) => (
	<header class={styles.header}>{props.children}</header>
)

export default Header
