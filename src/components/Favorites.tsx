import { For } from "solid-js"
import { A } from "@solidjs/router"
import { getFavorites } from "~/lib/favorites"
import styles from "./tree.module.css"

const Favorites = () => {
	return (
		<div class={styles.tree}>
			<For each={getFavorites}>
				{(path) => <A href={path}>{decodeURI(path)}</A>}
			</For>
		</div>
	)
}

export default Favorites
