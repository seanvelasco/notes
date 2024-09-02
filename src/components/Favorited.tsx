import Star from "~/icons/Star"
import { toggleFavorite, favorited } from "~/lib/favorites"

const Favorited = (props: { path: string }) => (
	<button onClick={() => toggleFavorite(props.path)}>
		<Star filled={favorited(props.path)} />
	</button>
)

export default Favorited
