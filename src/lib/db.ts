import { createStorage } from "unstorage"
import driver from "unstorage/drivers/github"

export const storage = createStorage({
    driver: driver({
        repo: "seanvelasco/notes",
        branch: "main",
        dir: "/"
    })
})