import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // permite acceso desde cualquier IP en tu red local
    port: 2005 // puedes cambiarlo si ya está en uso
  }
})
