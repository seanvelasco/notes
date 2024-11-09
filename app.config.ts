import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
    server: {
        preset: "vercel",
        esbuild: {
            options: {
                target: 'ESNext'
            }
        }
    }
})