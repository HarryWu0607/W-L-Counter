import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGHPages = process.env.BUILD_TARGET === 'gh';

// https://vite.dev/config/
export default defineConfig({
  base: isGHPages ? '/W-L-Counter/' : './',
  plugins: [react()],
});
