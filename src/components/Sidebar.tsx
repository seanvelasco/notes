import { createSignal, onMount, type JSXElement } from "solid-js"
import styles from "./sidebar.module.css"

const Sidebar = (props: { children: JSXElement }) => {
	// const [sidebarRef, setSidebarRef] = createSignal<HTMLDivElement>()
	// const [resizerRef, setResizerRef] = createSignal<HTMLDivElement>()
	// const [resizing, setResizing] = createSignal(false)
	//
	// onMount(() => {
	// 	resizerRef()!.addEventListener('mousedown', () => {
	// 		setResizing(true)
	// 		document.addEventListener('mousemove', resize)
	// 		document.addEventListener('mouseup', stop)
	// 	})
	// })
	//
	// const resize = (event: MouseEvent) => {
	// 	if (!resizing) return
	// 	let newWidth = event.clientX
	// 	// if (newWidth < 288) newWidth = 288
	// 	sidebarRef()!.style.width = newWidth + 'px';
	// }
	//
	// const stop = () => {
	// 	setResizing(false)
	// 	document.removeEventListener('mousemove', resize)
	// 	document.removeEventListener('mouseup', stop)
	// }

	// ref={setSidebarRef}
	return (<aside  class={styles.sidebar}>
		{/*<div class={styles.resizer} ref={setResizerRef}></div>*/}
		{props.children}
	</aside>)
}

export default Sidebar
