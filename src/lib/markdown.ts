import snarkdown from "snarkdown"

const markdown = (md: string) => {
    const htmls = md
        .split(/(?:\r?\n){2,}/)
        .map((l) =>
            [" ", "\t", "#", "-", "*"].some((ch) => l.startsWith(ch))
                ? snarkdown(l)
                : `<p>${snarkdown(l)}</p>`
        )

    return htmls.join("\n\n")
}

export default markdown
