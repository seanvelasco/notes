import storage from '$lib/x'

export const GET = async ({ params }) => {
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
