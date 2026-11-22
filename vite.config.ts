import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";

/** No `npm run dev`, as rotas do app (ex.: /suporte) abrem o app.html, como o vercel.json faz em produção. */
const appFallback = (): Plugin => ({
  name: "app-fallback",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url ?? "/";
      const path = url.split("?")[0];
      const isAsset = path.includes(".") || path.startsWith("/@") || path.startsWith("/src/") || path.startsWith("/node_modules/") || path.startsWith("/api/");
      if (req.method === "GET" && path !== "/" && !isAsset) req.url = "/app.html";
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), appFallback(), mode === "development" && componentTagger()].filter(Boolean),
  // Duas páginas: index.html é o site institucional (HTML estático) e app.html é o app React
  // (suporte, políticas e termos). O vercel.json manda as demais rotas para o app.html.
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        app: path.resolve(__dirname, "app.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
