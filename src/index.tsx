/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"
import App from "./App"
import Home from "./pages"
import Search from "./pages/search"
import Note from "./pages/[note]"
import { loadNote } from "./pages/[note]"
import NotFound from "./pages/404"

const root = document.getElementById("root")

render(
	() => (
		<Router root={App}>
			<Route path="/" component={Home} />
			<Route path="/search" component={Search} />
			<Route path="/*note" component={Note} load={loadNote} />
			<Route path="*404" component={NotFound} />
		</Router>
	),
	root!
)
