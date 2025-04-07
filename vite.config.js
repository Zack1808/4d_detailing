import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/firebase-proxy/": {
        target:
          "https://firebasestorage.googleapis.com/v0/b/d-detailing-7e55b.firebasestorage.app/o/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/firebase-proxy/, ""),
      },
    },
  },
  plugins: [react()],
});
