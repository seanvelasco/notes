import { query } from "@solidjs/router"
import { index } from "~/lib/storage"

const getIndex = query(async (path: string) => await index(path), "index")

export default getIndex