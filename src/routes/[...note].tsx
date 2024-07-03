import { Show, ErrorBoundary, For } from "solid-js"
import { Title } from "@solidjs/meta"
import { createAsync, A, cache, type RouteSectionProps } from "@solidjs/router"
import snarkdown from "snarkdown"
import { note, index } from "~/lib/storage"
import styles from "./styles.module.css"

const getIndex = cache(async (path: string) => index(path), "index")

const getNote = cache(async (path: string) => note(path), "note")

export const route = {
	load: (props: RouteSectionProps) => getNote(props.location.pathname)
}

const Markdown = (props: { markdown: string }) => (
	<div
		style={{ display: "contents" }}
		innerHTML={snarkdown(props.markdown)}
	/>
)

const FallbackPage = (err: unknown, retry: () => void) => (
	<p class={styles.empty}>An error occurred</p>
)

const EmptyPage = () => <p class={styles.empty}>This page is empty</p>

const IndexPage = (props: { path: string }) => {
	const index = createAsync(() => getIndex(props.path))
	return (
		<Show when={index()}>
			<div class={styles.index}>
				<For each={index() as any[]}>
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
		</Show>
	)
}

const NotePage = (props: RouteSectionProps) => {
	const note = createAsync(() => getNote(props.location.pathname))
	return (
		<div class={styles.page}>
			<div class={styles.content}>
				<ErrorBoundary fallback={FallbackPage}>
					<Show when={note()}>
						{(note) => (
							<>
								<Title>{note().title}</Title>
								<Show
									when={
										note().content || note().content === ""
									}
									fallback={
										<IndexPage
											path={props.location.pathname}
										/>
									}
								>
									<h1 class={styles.title}>{note().title}</h1>
									<Show
										when={note().content}
										fallback={<EmptyPage />}
									>
										{(content) => (
											<Markdown markdown={content()} />
										)}
									</Show>
								</Show>
							</>
						)}
					</Show>
				</ErrorBoundary>
			</div>
		</div>
	)
}

export default NotePage
