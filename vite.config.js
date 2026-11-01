import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // npm run preview перевіряє збірку для публікації: /api переспрямовуємо на локальний Express-сервер
  preview: {
    proxy: { '/api': 'http://localhost:3000' },
  },
})
