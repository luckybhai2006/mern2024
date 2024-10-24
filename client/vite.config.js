import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses, including LAN
    port: 5173, // You can change this port if needed
    open: true, // Automatically open the app in the browser on server start
  },
})
