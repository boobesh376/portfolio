import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // NOTE: If deploying to GitHub Pages, uncomment the line below
  // and replace 'portfolio' with your exact GitHub repository name.
  // For Vercel or Netlify, leave this commented out (not needed).
  // base: '/portfolio/',
})
