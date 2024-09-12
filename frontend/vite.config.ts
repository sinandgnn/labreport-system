import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'https://labreport-backend.onrender.com',
            '/reports_img': 'https://labreport-backend.onrender.com'
        }
    }
})
