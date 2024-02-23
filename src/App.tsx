import Tree from "./components/Tree"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { type JSXElement } from "solid-js"

const tree = [
	{
		title: "Home",
		path: "/home"
	},
	{
		title: "Calculus",
		path: "/calculus"
	},
	{
		title: "Foreign languages",
		path: "/foreign-languages",
		children: [
			{
				title: "Mandarin",
				path: "/foreign-languages/mandarin",
				children: [
					{
						title: "Characters",
						path: "/foreign-languages/mandarin/characters"
					},
					{
						title: "Words",
						path: "/foreign-languages/mandarin/words"
					}
				]
			},
			{
				title: "Japanese",
				path: "/foreign-languages/japanese"
			}
		]
	}
]

export const App = (props: { children?: JSXElement }) => (
	<>
		<Sidebar>
			<Tree tree={tree} />
		</Sidebar>
		<div>
			<Header />
			{props.children}
		</div>
	</>
)

export default App
