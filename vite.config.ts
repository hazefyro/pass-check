import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
  plugins: [tailwindcss(), viteReact(), cloudflare()],
})

export default config