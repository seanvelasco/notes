import driver from 'unstorage/drivers/github'
// import driver from "unstorage/drivers/fs"
import { env } from '$env/dynamic/private'
import { createStorage } from 'unstorage'

const options = {
	repo: env.GITHUB_REPO as string,
	branch: env.GITHUB_BRANCH || 'main',
	dir: env.GITHUB_DIR || '/',
	token: env.GITHUB_KEY as string
}
const storage = createStorage({ driver: driver(options) })

export default storage
