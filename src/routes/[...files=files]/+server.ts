import { createStorage } from 'unstorage'
import driver from 'unstorage/drivers/github'

const options = {
	repo: 'seanvelasco/notes-storage',
	branch: 'main',
	dir: '/',
	token: import.meta.env.VITE_GITHUB_KEY
}

const storage = createStorage({ driver: driver(options) })

export const GET = async ({ params }) => {
	console.log(params.files)
	const content = await storage.getItemRaw<Blob>(params.files)
	if (!content) {
		return new Response(undefined, {
			status: 400
		})
	}
	const options: ResponseInit = {
		status: 200,
		headers: {
			'Content-Type': content.type
		}
	}
	return new Response(content, options)
}
