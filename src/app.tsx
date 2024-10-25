import { createSignal, Show, Suspense, ErrorBoundary } from "solid-js"
import { clientOnly } from "@solidjs/start"
import { Router, createAsync, type RouteSectionProps } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { MetaProvider } from "@solidjs/meta"
import Sidebar from "~/components/Sidebar"
import Footer from "~/components/Footer"
import Main from "~/components/Main"
import Header from "~/components/Header"
import Toolbar from "~/components/Toolbar"
import Breadcrumbs from "~/components/Breadcrumbs"
import Tree from "~/components/Tree"
import SearchPreview from "~/components/SearchPreview"
import Canvas from "./components/Canvas"
import MenuIcon from "~/icons/Menu"
import SearchIcon from "~/icons/Search"
import SortIcon from "~/icons/Sort"
import CollapseIcon from "~/icons/Collapse"
import ExpandIcon from "~/icons/Expand"
import getNote from "~/api/getNote"
import getTree from "~/api/getTree"
import styles from "./app.module.css"
import "./app.css"
const Favorites = clientOnly(() => import("~/components/Favorites"))
const Favorited = clientOnly(() => import("~/components/Favorited"))

// import { useTransition } from "solid-js"

const Fallback = () => <div>

</div>

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
					<Show when={expand()} fallback={<ExpandIcon/>}>
						<CollapseIcon />
					</Show>
				</button>
			</div>
			<Favorites />
			<ErrorBoundary fallback={<p>Unable to render tree</p>}>
				<Show when={tree()}>
					{(tree) => <Tree tree={tree()} />}
				</Show>
			</ErrorBoundary>
			<Footer />
		</Sidebar>
	)
}

export const Root = (props: RouteSectionProps) => {
	// const [pending] = useTransition()
	const [isSidebarOpen, setSidebarOpen] = createSignal(false)
	const [isSearchOpen, setSearchOpen] = createSignal(false)
	const [starred, setStarred] = createSignal(false)

	// move all these to a layout component, including components that consume them, to make use of pre-loading
	const tree = createAsync(() => getTree())
	const note = createAsync(() => getNote(props.location.pathname))

	return (
		<ErrorBoundary fallback={(err) => <p>An error occurred {JSON.stringify(err)}</p>}>
			<MetaProvider>
				<Suspense>
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
				</Suspense>
			</MetaProvider>
		</ErrorBoundary>
	)
}

const App = () => (
	<Router root={Root}>
		<FileRoutes />
	</Router>
)

export default App
