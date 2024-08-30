import {cache} from "@solidjs/router";
import {index} from "~/lib/storage";

const getIndex = cache(async (path: string) => await index(path), "index")

export default getIndex