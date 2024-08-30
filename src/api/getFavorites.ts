import {cache} from "@solidjs/router";
import {root} from "~/lib/storage";

const getFavorites = cache(async () => await root(), "root")

export default getFavorites