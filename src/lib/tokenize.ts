const exclude = ['-']

const tokenize = (text: string) => {
	let original = text
	text = text.replace(/```[\s\S]*?```/g, '')
	text = text.replace(/`[^`]*`/g, '')
	text = text.replace(/\[([^\]]+)\]\([^\\)]+\)/g, '$1')
	text = text.replace(/<[^>]*>/g, '')
	text = text.replace(/#{1,6}\s+([^\n]+)/g, '$1')
	text = text.replace(/(\*\*|__)(.*?)\1/g, '$2')
	text = text.replace(/(\*|_)(.*?)\1/g, '$2')
	text = text.replace(/^[\s-]*[-+*]|\d+\.\s+/gm, '')
	const words = text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0)
		.filter((word) => !exclude.includes(word))
	// const characters = text.replace(/[^a-zA-Z]/g, '')
	original = original.replace(/[^a-zA-Z]/g, '')

	return {
		words: words.length,
		characters: original.length
	}
}

export default tokenize
