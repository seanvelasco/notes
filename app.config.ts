import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
    server: {
        preset: "node",
        esbuild: {
            options: {
                target: 'ESNext'
            }
        }
    }
})