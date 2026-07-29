import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/ui-designs/",
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname
    }
  },
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5182,
    strictPort: true
  }
});
