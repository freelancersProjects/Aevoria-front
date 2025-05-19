import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    allowedHosts: [
      '3f67-2a01-e0a-5fa-36a0-464-876d-d73c-1841.ngrok-free.app'
    ]
  }
})
