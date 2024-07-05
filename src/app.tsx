import { Show, Suspense, ErrorBoundary } from "solid-js"
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
import Breadcrumbs from "~/components/Breadcrumbs"
import Tree from "~/components/Tree"
import Canvas from "./components/Canvas"
import { root } from "~/lib/storage"
import "./app.css"

// import { useTransition } from "solid-js"

const getRoot = cache(async () => await root(), "root")

export const Root = (props: RouteSectionProps) => {
	// const [pending] = useTransition()
	const root = createAsync(() => getRoot())
	return (
		<ErrorBoundary fallback={<p>An error occurred</p>}>
			<MetaProvider>
				<Suspense>
					<Sidebar>
						<Show when={root()}>
							{(root) => <Tree tree={root()} />}
						</Show>
						<Footer />
					</Sidebar>
					<Main>
						<Header>
							<Breadcrumbs />
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
