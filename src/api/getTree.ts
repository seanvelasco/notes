import { query } from "@solidjs/router"
import { root } from "~/lib/storage"

const getTree = query(async () => await root(), "root")

export default getTree