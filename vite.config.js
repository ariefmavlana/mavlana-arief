import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Keep the tree textures as cacheable assets instead of the package's embedded data URLs.
      '@dgreenheck/ez-tree': fileURLToPath(
        new URL(
          './node_modules/@dgreenheck/ez-tree/src/lib/index.js',
          import.meta.url,
        ),
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/three/build/three.core')) return 'three-core'
          if (id.includes('/three/build/three.module')) return 'three-renderer'
          if (id.includes('/three/examples/')) return 'three-addons'
          if (id.includes('/node_modules/gsap/')) return 'motion'
        },
      },
    },
  },
})
