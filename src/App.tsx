import Tree from "./components/Tree"
import Breadcrumbs from "./components/Breadcrumbs"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import { useStorage } from "./lib/storage"
import type { JSXElement } from "solid-js"

const App = (props: { children?: JSXElement }) => {
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
				{props.children}
			</Main>
			{/* <Sidebar background="inherit">
				<Table chapters={[]} />
			</Sidebar> */}
		</>
	)
}
export default App
