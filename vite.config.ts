import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
    server: {
    host: '0.0.0.0', // ✅ Expose to local network
    port: 5173,       // Optional: use default or change
  },
})