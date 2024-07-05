import { Title, Meta, Link } from "@solidjs/meta"

const Home = () => {
	const title = "Notes - notes.sean.app"
	const description = "Notes by Sean Velasco"
	return (
		<>
			<Title>{title}</Title>
			<Meta name="description" content={description} />
			<Meta name="og:title" content={title} />
			<Meta name="og:description" content={description} />
			<Link rel="canonical" href="https://notes.sean.app" />
		</>
	)
}

export default Home
