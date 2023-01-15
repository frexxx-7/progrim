import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "firebase", 
      "firebase/app", 
      "firebase/auth", 
      "firebase/firestore", 
      "firebase/analytics",
      'firebase/functions',
      'firebase/storage',
      'firebase/compat/auth',
      'firebase/compat/firestore',
      "firebase/database"
    ],
  }
})
