import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../..', '')
  return {
    plugins: [react()],
    envDir: '../..',
    server: { port: Number(env.ADMIN_PORT) || 5174 },
  }
})