import { root } from '$lib/storage'

export const load = async () => {
	const tree = await root()
	if (tree.length) {
		return {
			tree
		}
	}
}
