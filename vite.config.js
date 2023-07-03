import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "./config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: config.apiBaseUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
