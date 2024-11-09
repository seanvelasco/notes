import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
    server: {
        preset: "vercel-edge",
        esbuild: {
            options: {
                target: 'ESNext'
            }
        }
    }
})