import { createStore } from "solid-js/store"
import { makePersisted } from "@solid-primitives/storage"

// working  "@solid-primitives/storage": "^2.1.1",
// not working, expets two diff types "@solid-primitives/storage": "^4.2.0"

const [store, setStore] = makePersisted(createStore<string[]>([]), { name: "favorites" })

const getFavorites = store

const favorited = (path: string) => store.includes(path)

const toggleFavorite = (path: string) => {
	if (store.includes(path))
		setStore((paths) => paths.filter(p => p !== path))
	else setStore((paths) => [...paths, path])
}

export {
	getFavorites,
	favorited,
	toggleFavorite
}