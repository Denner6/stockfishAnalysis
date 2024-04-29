import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: [
          { find: "@board-back-end", replacement: path.resolve(__dirname, "./server/board-back-end/") } 
      ]
  },
  server: {
        fs: {
            cachedChecks: false
        }
    }
})