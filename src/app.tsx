import { Suspense } from "solid-js"
import { Router, Route, RouteSectionProps } from "@solidjs/router"
import { StorageProvider, useStorage } from "~/lib/storage"
import Home from "~/pages"
import Search from "~/pages/search"
import Note, { loadNote } from "~/pages/[note]"
import NotFound from "~/pages/404"
import Tree from "~/components/Tree"
import Breadcrumbs from "~/components/Breadcrumbs"
import Header from "~/components/Header"
import Sidebar from "~/components/Sidebar"
import Main from "~/components/Main"

const Root = (props: RouteSectionProps) => {
	const { notes } = useStorage()

	return (
		<>
			<Sidebar>
				<Tree tree={notes()} />
			</Sidebar>
			<Main>
				<Header>
					<Breadcrumbs />
				</Header>
				<Suspense>{props.children}</Suspense>
			</Main>
		</>
	)
}

const App = () => (
	<StorageProvider>
		<Router root={Root}>
			<Route path="/" component={Home} />
			<Route path="/search" component={Search} />
			<Route path="/*note" component={Note} load={loadNote} />
			<Route path="*404" component={NotFound} />
		</Router>
	</StorageProvider>
)

export default App
