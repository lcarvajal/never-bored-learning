import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  base: import.meta.env.VITE_PUBLIC_URL || '/',
  plugins: [
    react()
  ],
  define: {
    'process.env': {
      VITE_PUBLIC_URL: JSON.stringify(process.env.VITE_PUBLIC_URL),
      VITE_FIREBASE_API_KEY: JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
      VITE_FIREBASE_APP_ID: JSON.stringify(process.env.VITE_FIREBASE_APP_ID),
      VITE_FIREBASE_WEB_PUSH_CERTIFICATE_KEY: JSON.stringify(process.env.VITE_FIREBASE_WEB_PUSH_CERTIFICATE_KEY),
    }
  }
})
