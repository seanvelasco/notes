import { Title, Meta, Link } from "@solidjs/meta"
import { BASE_URL } from "~/lib/constants"

const Home = () => {
	const title = `Notes - ${BASE_URL}`
	const description = "Notes by Sean Velasco"
	return (
		<>
			<Title>{title}</Title>
			<Meta name="description" content={description} />
			<Meta name="og:title" content={title} />
			<Meta name="og:description" content={description} />
			<Link rel="canonical" href={`https://${BASE_URL}`} />
			<p>wo yao ni</p>
		</>
	)
}

export default Home
