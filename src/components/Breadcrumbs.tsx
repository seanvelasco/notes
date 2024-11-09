import { Show, For } from "solid-js"
import { A, useLocation } from "@solidjs/router"
import styles from "./breadcrumbs.module.css"

const createPaths = () => {
	const location = useLocation() // already URI-encoded

	const paths = location.pathname.split("/").filter(Boolean)

	if (!paths) return

	const breadcrumbs: { label: string; href: string }[] = []

	for (const path of paths) {
		const prev = breadcrumbs[breadcrumbs.length - 1]
		breadcrumbs.push({
			label: path,
			href: prev ? prev.href + `/${path}` : `/${path}`
		})
	}

	return breadcrumbs
}

const Breadcrumbs = () => (
	<Show when={createPaths()}>
		{(paths) => (
			<nav class={styles.breadcrumbs}>
				<For each={paths()}>
					{(path, index) => (
						<>
							<A
								class={styles.breadcrumb}
								href={path.href}
								activeClass="activeBreadcrumb"
								end={true}
							>
								{decodeURIComponent(path.label)}
							</A>
							<Show when={index() < paths().length - 1}>
								<span class={styles.divider}>/</span>
							</Show>
						</>
					)}
				</For>
			</nav>
		)}
	</Show>
)

export default Breadcrumbs
