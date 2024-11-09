import { Suspense, ErrorBoundary } from "solid-js"
import { Router, Route, type RouteSectionProps } from "@solidjs/router"
import { MetaProvider } from "@solidjs/meta"
import Layout from "~/routes"
import Home from "~/routes/[note]"
import Notes from "~/routes/[note]/[...note]"
import getTree from "~/api/getTree"
import getNote from "~/api/getNote"
import "./app.css"

export const Root = (props: RouteSectionProps) => (
	<ErrorBoundary
		fallback={(err) => <p>An error occurred {JSON.stringify(err)}</p>}
	>
		<MetaProvider>
			<Suspense>{props.children}</Suspense>
		</MetaProvider>
	</ErrorBoundary>
)

const App = () => (
	<Router root={Root}>
		<Route path="/" component={Layout} load={() => getTree()}>
			<Route path="/" component={Home} />
			<Route
				path="/*"
				component={Notes}
				load={(props) => getNote(props.location.pathname)}
			/>
		</Route>
	</Router>
)

export default App
