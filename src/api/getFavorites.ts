import { query } from "@solidjs/router"
import { root } from "~/lib/storage"

const getFavorites = query(async () => await root(), "root")

export default getFavorites