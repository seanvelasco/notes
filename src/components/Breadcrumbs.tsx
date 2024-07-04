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
								<span
									style={{
										"user-select": "none",
										color: "var(--text-secondary)"
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

export default Breadcrumbs
