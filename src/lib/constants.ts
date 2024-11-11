export enum ALLOWED_FILES {
	MD = '.md',
	JPEG = '.jpg'
}

export const ALLOWED = ['.md']

export const HOSTNAME = 'notes.sean.app'

const image = ['jpeg', 'jpg', 'png', 'webp', 'svg', 'gif', 'bmp', 'avif']
const audio = ['flac', 'm4a', 'mp3', 'ogg', 'wav', 'webm', '3gp']
const video = ['mkv', 'mov', 'mp4', 'ogv', 'webm']
const document = ['pdf']

export const allowed = ['md', ...image, ...audio, ...video, ...document]
