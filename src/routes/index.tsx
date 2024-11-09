import { createSignal, Show, Suspense, ErrorBoundary } from "solid-js"
import { clientOnly } from "@solidjs/start"
import { createAsync, type RouteSectionProps } from "@solidjs/router"
import Main from "~/components/Main"
import Header from "~/components/Header"
import Toolbar from "~/components/Toolbar"
import Breadcrumbs from "~/components/Breadcrumbs"
import SearchPreview from "~/components/SearchPreview"
import Canvas from "~/components/Canvas"
import Sidebar from "~/components/Sidebar"
import Footer from "~/components/Footer"
import Tree from "~/components/Tree"
import MenuIcon from "~/icons/Menu"
import SearchIcon from "~/icons/Search"
import CollapseIcon from "~/icons/Collapse"
import SortIcon from "~/icons/Sort"
import ExpandIcon from "~/icons/Expand"
import getTree from "~/api/getTree"
import getNote from "~/api/getNote"
import styles from "../app.module.css"
const Favorited = clientOnly(() => import("~/components/Favorited"))
const Favorites = clientOnly(() => import("~/components/Favorites"))

const Side = () => {
	const tree = createAsync(() => getTree())
	const [expand, setExpand] = createSignal(false)
	return (
		<Sidebar>
			<div class={styles.header}>
				<button>
					<SortIcon />
				</button>
				<button onClick={() => setExpand((prev) => !prev)}>
					<Show when={expand()} fallback={<ExpandIcon />}>
						<CollapseIcon />
					</Show>
				</button>
			</div>
			<Favorites />
			<ErrorBoundary fallback={<p>Unable to render tree</p>}>
				<Show when={tree()}>{(tree) => <Tree tree={tree()} />}</Show>
			</ErrorBoundary>
			<Footer />
		</Sidebar>
	)
}

const Layout = (props: RouteSectionProps) => {
	// move all these to a layout component, including components that consume them, to make use of pre-loading
	const tree = createAsync(() => getTree())
	const note = createAsync(() => getNote(props.location.pathname))
	return (
		<>
			<Side />
			<Main>
				<ErrorBoundary fallback={<p>Unable to render main</p>}>
					<Header>
						<Toolbar>
							<button class={styles.menu}>
								<MenuIcon />
							</button>
							<Show when={tree()}>
								{(tree) => (
									<SearchPreview tree={tree()}>
										<SearchIcon />
									</SearchPreview>
								)}
							</Show>
						</Toolbar>
						<Breadcrumbs />
						<Toolbar>
							<Show when={note()}>
								<Favorited path={props.location.pathname} />
							</Show>
						</Toolbar>
					</Header>
					<Suspense>
						<Canvas>{props.children}</Canvas>
					</Suspense>
				</ErrorBoundary>
			</Main>
		</>
	)
}

export default Layout
