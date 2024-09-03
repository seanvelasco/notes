import { Show, For } from "solid-js"
import { A } from "@solidjs/router"
import { getFavorites } from "~/lib/favorites"
import styles from "./tree.module.css"

const Favorites = () => (
	<Show when={Boolean(getFavorites.length) && getFavorites}>
		{(favorites) => (
			<>
				<div class={styles.tree}>
					{/* <p
						style={{
							margin: 0,
							"font-size": "0.75rem",
							"user-select": "none",
							color: "var(--text-secondary)"
						}}
					>
						Favorites
					</p> */}
					<For each={favorites()}>
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
			</>
		)}
	</Show>
)

export default Favorites
