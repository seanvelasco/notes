import {cache} from "@solidjs/router";
import {root} from "~/lib/storage";

const getTree = cache(async () => await root(), "root")

export default getTree