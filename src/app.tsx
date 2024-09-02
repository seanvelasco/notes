import { createSignal, Show, Suspense, ErrorBoundary } from "solid-js"
import {
	Router,
	createAsync,
	cache,
	type RouteSectionProps
} from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { MetaProvider } from "@solidjs/meta"
import Sidebar from "~/components/Sidebar"
import Footer from "~/components/Footer"
import Main from "~/components/Main"
import Header from "~/components/Header"
import Toolbar from "~/components/Toolbar"
import Breadcrumbs from "~/components/Breadcrumbs"
import Tree from "~/components/Tree"
import Favorites from "~/components/Favorites"
import SearchPreview from "~/components/SearchPreview"
import Canvas from "./components/Canvas"
import "./app.css"
import MenuIcon from "~/icons/Menu"
import SearchIcon from "~/icons/Search"
import Star from "~/icons/Star"
import getNote from "~/api/getNote"
import getTree from "~/api/getTree"
import getFavorites from "~/api/getFavorites"
import styles from "./app.module.css"
// import { useTransition } from "solid-js"

export const Root = (props: RouteSectionProps) => {
	// const [pending] = useTransition()
	const [isSidebarOpen, setSidebarOpen] = createSignal(false)
	const [isSearchOpen, setSearchOpen] = createSignal(false)
	const [starred, setStarred] = createSignal(false)
	const toggle = () => setStarred(!starred())
	// move all these to a layout component, including components that consume them, to make use of pre-loading
	const tree = createAsync(() => getTree())
	const note = createAsync(() => getNote(props.location.pathname))
	const favorites = createAsync(() => getFavorites())

	return (
		<ErrorBoundary fallback={<p>An error occurred</p>}>
			<MetaProvider>
				<Suspense>
					<Sidebar>
						<Show when={favorites()}>
							<Favorites />
						</Show>
						<Show when={tree()}>
							{(tree) => <Tree tree={tree()} />}
						</Show>
						<Footer />
					</Sidebar>
					<Main>
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
									<button onClick={toggle}>
										<Star filled={starred()} />
									</button>
								</Show>
							</Toolbar>
						</Header>
						<Suspense>
							<Canvas>{props.children}</Canvas>
						</Suspense>
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
