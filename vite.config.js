import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    allowedHosts: [
      '8679-2a01-e0a-5fa-36a0-7cb8-6597-293a-14b2.ngrok-free.app'
    ]
  }
})
