import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    // Allow overriding via PORT env; fallback to 5173 if 8080 is busy
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, "client"),
        path.resolve(__dirname, "shared"),
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    allowedHosts: [
      'seal-app-wan5l.ondigitalocean.app',
      '.ondigitalocean.app' // This allows all Digital Ocean app URLs
    ]
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
