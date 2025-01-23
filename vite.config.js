import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'NEXT_'],
  server: {
    port: 3000,
  },
  // Make sure to set the correct Supabase URL here
  VITE_SUPABASE_URL: '../../lib/supabase',
})
