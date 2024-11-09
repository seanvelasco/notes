import { query } from "@solidjs/router"
import { note } from "~/lib/storage"

const getNote = query(async (path: string) => await note(path), "note")

export default getNote