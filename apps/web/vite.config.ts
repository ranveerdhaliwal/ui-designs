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
  build: { rollupOptions: { input: { main: new URL('./index.html', import.meta.url).pathname, paint: new URL('./wet-paint.html', import.meta.url).pathname } } },
  server: {
    host: "127.0.0.1",
    port: 5182,
    strictPort: true
  }
});
