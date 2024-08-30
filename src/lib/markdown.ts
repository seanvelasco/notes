import snarkdown from "snarkdown"

const markdown = (md: string) =>
	md
		.split(/(?:\r?\n){2,}/)
		.map((l) =>
			[" ", "\t", "#", "-", "*"].some((ch) => l.startsWith(ch)) ? snarkdown(l) : `<p>${snarkdown(l)}</p>`)
		.join("\n\n")

export default markdown
