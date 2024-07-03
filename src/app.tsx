import "./app.css"
import Sidebar from "~/components/Sidebar"
import { Show, Suspense } from "solid-js"
import { createAsync, cache, type RouteSectionProps } from "@solidjs/router"
import { root } from "~/lib/storage"
import Footer from "~/components/Footer"
import Main from "~/components/Main"
import Header from "~/components/Header"
import Breadcrumbs from "~/components/Breadcrumbs"
import Tree from "~/components/Tree"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { MetaProvider } from "@solidjs/meta"

const getRoot = cache(root, "root")

export const Root = (props: RouteSectionProps) => {
	const root = createAsync(() => getRoot())
	return (
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
					<Suspense>{props.children}</Suspense>
				</Main>
			</Suspense>
		</MetaProvider>
	)
}

const App = () => (
	<Router root={Root}>
		<FileRoutes />
	</Router>
)

export default App
