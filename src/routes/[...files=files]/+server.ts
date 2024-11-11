import { createStorage } from 'unstorage'
import driver from 'unstorage/drivers/github'
import { env } from '$env/dynamic/private'

const options = {
	repo: env.GITHUB_REPO as string,
	branch: env.GITHUB_BRANCH || 'main',
	dir: env.GITHUB_DIR || '/',
	token: env.GITHUB_KEY as string
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
