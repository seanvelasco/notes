import {
	Show,
	ErrorBoundary,
	For,
	createSignal,
	onMount,
	createEffect
} from "solid-js"
import { Title, Meta, Link } from "@solidjs/meta"
import { createAsync, A, cache, type RouteSectionProps } from "@solidjs/router"
import snarkdown from "snarkdown"
import { note, index } from "~/lib/storage"
import styles from "./styles.module.css"
import { BASE_URL } from "~/lib/constants"
import { HttpStatusCode } from "@solidjs/start"

const [ref, setRef] = createSignal<HTMLDivElement | undefined>()

const getIndex = cache(async (path: string) => await index(path), "index")

const getNote = cache(async (path: string) => await note(path), "note")

const getTitle = (path: string) =>
	decodeURIComponent(path).split("/").pop() || ""

export const route = {
	load: (props: RouteSectionProps) => getNote(props.location.pathname)
}

const NotFound = () => (
	<>
		<HttpStatusCode code={404} />
		<Title>Not found - notes.sean.app</Title>
		<Meta name="og:title" content="Not found - notes.sean.app" />
		<p class={styles.empty}>Note not found</p>
	</>
)

const Markdown = (props: {
	markdown: string
	// ref: HTMLDivElement | undefined
}) => {
	return (
		<div
			ref={(el) => setRef(el)}
			style={{ display: "contents" }}
			innerHTML={snarkdown(props.markdown)}
		/>
	)
}

const FallbackPage = (props: { error: any; retry?: () => void }) => (
	<>
		<HttpStatusCode code={500} />
		<p class={styles.empty}>
			An error occurred. Contact{" "}
			<a href="mailto:sean@sean.app">sean@sean.app</a>.
		</p>
	</>
)

const EmptyPage = () => <p class={styles.empty}>This page is empty</p>

const IndexPage = (props: { path: string }) => {
	const index = createAsync(() => getIndex(props.path))
	return (
		<Show when={index()} fallback={<NotFound />}>
			{(index) => (
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
			)}
		</Show>
	)
}

type TocItem = { level: string; title: string; children?: TocItem[] }

const createTableOfContents = (ref: HTMLDivElement | undefined) => {
	const contents: TocItem[] = []
	if (ref) {
		const headings = ref.querySelectorAll("h1, h2, h3, h4, h5")
		for (const heading of headings) {
			const { tagName, textContent } = heading
			if (textContent) {
				contents.push({
					level: tagName.substring(1, 2),
					title: textContent
				})
			}
		}
	}
	return contents
}

const TableOfContents = (props: {
	contentsRef: HTMLDivElement | undefined
}) => {
	const [items, setItems] = createSignal<TocItem[]>([])

	onMount(() => {
		if (props.contentsRef) {
			setItems(createTableOfContents(props.contentsRef))
		}
	})

	return (
		<ol>
			<p>{JSON.stringify(props.contentsRef?.textContent)}</p>
			<For each={items()}>
				{(toc) => (
					<li>
						<button>{toc.title}</button>
					</li>
				)}
			</For>
		</ol>
	)
}

const NotePage = (props: RouteSectionProps) => {
	const note = createAsync(() => getNote(props.location.pathname))
	const subject = () => getTitle(props.location.pathname)
	const title = () => `${subject()} - ${BASE_URL}`

	return (
		<ErrorBoundary fallback={(error) => <FallbackPage error={error} />}>
			<Title>{title()}</Title>
			<Meta name="og:title" content={title()} />
			<Link
				rel="canonical"
				href={`https://${BASE_URL}${decodeURIComponent(
					props.location.pathname
				)}`}
			/>
			{/* <TableOfContents contentsRef={ref()} /> */}
			<h1 class={styles.title}>{subject()}</h1>
			<Show
				when={note()}
				fallback={<IndexPage path={props.location.pathname} />}
			>
				{(note) => (
					<>
						<Show when={note().content} fallback={<EmptyPage />}>
							{(content) => <Markdown markdown={content()} />}
						</Show>
					</>
				)}
			</Show>
		</ErrorBoundary>
	)
}

export default NotePage
