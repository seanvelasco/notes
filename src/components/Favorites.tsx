import { For } from "solid-js"
import { A } from "@solidjs/router"
import { getFavorites } from "~/lib/favorites"
import styles from "./tree.module.css"

const Favorites = () => (
	<div class={styles.tree}>
		<For each={getFavorites}>
			{(path) => (
				<A
					href={path}
					class={styles.leaf}
					activeClass="activeNote"
					end={true}
					style={{
						"padding-left": "2.5rem"
					}}
				>
					{decodeURI(path).split("/").pop()}
				</A>
			)}
		</For>
	</div>
)

export default Favorites
