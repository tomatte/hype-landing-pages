import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

function landingsMiddleware(): Plugin {
  return {
    name: "landings-static-middleware",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith("/landings/")) {
          const urlPath = req.url.split("?")[0];

          // /landings/landing1/ → public/landings/landing1/index.html
          if (urlPath.endsWith("/")) {
            const filePath = path.join(
              process.cwd(),
              "public",
              urlPath,
              "index.html"
            );
            if (fs.existsSync(filePath)) {
              req.url = urlPath + "index.html";
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [landingsMiddleware(), react(), tailwindcss()],
});
