import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@gallery': fileURLToPath(new URL('./gallery/src/', import.meta.url)),
      '@novel': fileURLToPath(new URL('./novel/src', import.meta.url)),
      '@main': fileURLToPath(new URL('./src', import.meta.url))
      //  '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    fs: {
      cachedChecks: false
    }
  }
})
