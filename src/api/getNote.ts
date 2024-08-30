import {cache} from "@solidjs/router";
import {note} from "~/lib/storage";

const getNote = cache(async (path: string) => await note(path), "note")

export default getNote