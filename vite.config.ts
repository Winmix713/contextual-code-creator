import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Determine if we're using local Supabase
const isLocalDev = process.env.VITE_SUPABASE_URL?.includes("localhost");
const supabaseUrl = process.env.VITE_SUPABASE_URL || "http://localhost:54321";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Proxy configuration for local Supabase development
    // Routes /functions/v1/* to the local Supabase edge functions runtime
    // For hosted environments, this proxy is disabled and requests go directly to the hosted Supabase URL
    proxy: isLocalDev
      ? {
          "/functions/v1": {
            target: supabaseUrl,
            changeOrigin: true,
            rewrite: (path) => path, // Keep the path as-is
          },
        }
      : {},
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@winmixpro", replacement: path.resolve(__dirname, "./src/winmixpro") },
      { find: "react-flow-renderer", replacement: path.resolve(__dirname, "./src/vendor/react-flow-renderer.tsx") },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-tabs'],
          'query-vendor': ['@tanstack/react-query', '@supabase/supabase-js'],
          'chart-vendor': ['recharts'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': ['date-fns', 'clsx', 'tailwind-merge', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
