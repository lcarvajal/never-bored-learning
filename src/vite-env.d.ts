/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_WEB_PUSH_CERTIFICATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}