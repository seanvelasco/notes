import { Show, For, type JSXElement} from "solid-js"
import { useLocation } from "@solidjs/router"
// import SearchInput from "../../components/SearchInput.tsx"
import SearchEntry from "../../components/SearchEntry.tsx"

const notesCount = () => 512

const topicsCount = () => 32

const searchResults: any[] = []

const Fallback = (props: { children?: JSXElement}) => (
    <p>{props.children ?? `Search across ${notesCount()} notes and ${topicsCount()} topics`}</p>
)

const SearchPage = () => {
    const location = useLocation()

    const { q: searchQuery } = location.query

    return <Show when={!searchQuery} fallback={<Fallback/>}>
        <For each={searchResults} fallback={<Fallback>No results found</Fallback>}>
            {(result) => (
                <>
                    <p>{result}</p>
                    <SearchEntry/>
                </>
            )}
        </For>
    </Show>
}

export default SearchPage