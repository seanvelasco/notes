import { Title, Meta, Link } from "@solidjs/meta"

const Home = () => {
	return (
		<>
			<Title>Notes - notes.sean.app</Title>
			<Meta name="description" content="Notes by Sean Velasco" />
			<Meta name="og:title" content="Notes - notes.sean.app" />
			<Meta name="og:description" content="Notes by Sean Velasco" />
			<Link rel="canonical" href="https://notes.sean.app" />
		</>
	)
}

export default Home
