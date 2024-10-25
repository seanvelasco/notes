import { createSignal, For, Show, ErrorBoundary } from "solid-js"
import { Title, Meta, Link } from "@solidjs/meta"
import { createAsync, A, type RouteSectionProps } from "@solidjs/router"
import { HttpStatusCode } from "@solidjs/start"
import markdown from "~/lib/markdown"
import latex from "~/lib/latex"
import { BASE_URL } from "~/lib/constants"
import getNote from "~/api/getNote"
import getIndex from "~/api/getIndex"
import styles from "./styles.module.css"
import "katex/dist/katex.min.css"

const [ref, setRef] = createSignal<HTMLDivElement | undefined>()

const getTitle = (path: string) =>
	decodeURIComponent(path).split("/").pop() || ""

export const route = {
	load: (props: RouteSectionProps) => getNote(props.location.pathname)
}

const Markdown = (props: { markdown: string }) => (
	<div
		class={styles.markdown}
		ref={setRef}
		innerHTML={markdown(latex(props.markdown))}
	/>
)

const NotFoundFallback = () => (
	<>
		<HttpStatusCode code={404} />
		<Title>Not found</Title>
		<Meta name="og:title" content="Not found" />
		<p class={styles.empty}>Note not found</p>
	</>
)

const ErrorFallbackPage = (props: { error: any; retry?: () => void }) => (
	<>
		<HttpStatusCode code={500} />
		<p class={styles.empty}>
			An error occurred. Contact{" "}
			<a href="mailto:sean@sean.app">sean@sean.app</a>.
		</p>
	</>
)

const EmptyPageFallback = () => <p class={styles.empty}>This page is empty</p>

const IndexPage = (props: { path: string; subject: string }) => {
	const index = createAsync(() => getIndex(props.path))
	return (
		<Show when={index()} fallback={<NotFoundFallback />}>
			{(index) => (
				<>
					<h1 class={styles.title}>{props.subject}</h1>
					<div class={styles.index}>
						<For each={index()}>
							{(note) => (
								<A class={styles.indexpage} href={note.path}>
									{note.title}
									<Show when={note?.children.length}>
										{" "}
										({note?.children.length})
									</Show>
								</A>
							)}
						</For>
					</div>
				</>
			)}
		</Show>
	)
}

const NotePage = (props: RouteSectionProps) => {
	const note = createAsync(() => getNote(props.location.pathname))
	const subject = () => getTitle(props.location.pathname)
	const title = () => subject()
	return (
		<ErrorBoundary
			fallback={(error) => <ErrorFallbackPage error={error} />}
		>
			<Title>{title()}</Title>
			<Meta name="og:title" content={title()} />
			<Link
				rel="canonical"
				href={`https://${BASE_URL}${decodeURIComponent(
					props.location.pathname
				)}`}
			/>
			{/* <TableOfContents contentsRef={ref()} /> */}
			<Show
				when={note()}
				fallback={
					<IndexPage
						path={props.location.pathname}
						subject={subject()}
					/>
				}
			>
				{(note) => (
					<>
						<h1 class={styles.title}>{subject()}</h1>
						<Show
							when={note().content}
							fallback={<EmptyPageFallback />}
						>
							{(content) => <Markdown markdown={content()} />}
						</Show>
					</>
				)}
			</Show>
		</ErrorBoundary>
	)
}

// type TocItem = { level: string; title: string; children?: TocItem[] }

// const createTableOfContents = (ref: HTMLDivElement | undefined) => {
// 	const contents: TocItem[] = []
// 	if (ref) {
// 		const headings = ref.querySelectorAll("h1, h2, h3, h4, h5")
// 		for (const heading of headings) {
// 			const { tagName, textContent } = heading
// 			if (textContent) {
// 				contents.push({
// 					level: tagName.substring(1, 2),
// 					title: textContent
// 				})
// 			}
// 		}
// 	}
// 	return contents
// }

// const TableOfContents = (props: {
// 	contentsRef: HTMLDivElement | undefined
// }) => {
// 	const [items, setItems] = createSignal<TocItem[]>([])

// 	onMount(() => {
// 		if (props.contentsRef) {
// 			setItems(createTableOfContents(props.contentsRef))
// 		}
// 	})

// 	return (
// 		<ol>
// 			<p>{JSON.stringify(props.contentsRef?.textContent)}</p>
// 			<For each={items()}>
// 				{(toc) => (
// 					<li>
// 						<button>{toc.title}</button>
// 					</li>
// 				)}
// 			</For>
// 		</ol>
// 	)
// }

export default NotePage
