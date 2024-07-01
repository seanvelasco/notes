import { Show, For } from "solid-js"
import { A, useParams, useLocation, useMatch } from "@solidjs/router"
import styles from "./breadcrumbs.module.css"

const createPaths = () => {
	const params = useParams() // already URI-encoded

	const paths = params.note?.split("/")

	if (!paths) return

	let breadcrumbs: { label: string; href: string }[] = []

	for (const path of paths) {
		const prev = breadcrumbs[breadcrumbs.length - 1]
		breadcrumbs.push({
			label: path,
			href: prev ? prev.href + `/${path}` : `/${path}`
		})
	}
	return breadcrumbs
}

const isEnd = (path: string) => {
	const location = useLocation()
	return path === location.pathname
}

const Breadcrumbs = () => {
	const location = useLocation()
	const match = useMatch(() => location.pathname)

	return (
		<Show when={createPaths()}>
			{(paths) => (
				<nav class={styles.breadcrumbs}>
					<For each={paths()}>
						{(path) => (
							<>
								<A
									class={styles.breadcrumb}
									href={path.href}
									activeClass="activeBreadcrumb"
									end={true}
								>
									{decodeURIComponent(path.label)}
								</A>
								<Show when={!match()}>
									<span
										style={{
											"user-select": "none"
										}}
									>
										/
									</span>
								</Show>
							</>
						)}
					</For>
				</nav>
			)}
		</Show>
	)
}

export default Breadcrumbs
