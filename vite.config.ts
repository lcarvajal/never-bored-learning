import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // FIXME: - Use only for dev environment
    basicSsl()
  ],
  define: {
    'process.env': {}
  }
})
