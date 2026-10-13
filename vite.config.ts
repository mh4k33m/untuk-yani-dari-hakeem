import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => {
  const base = command === "build" ? "/untuk-yani-dari-hakeem/" : "/";

  return {
    base,
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      tanstackStart({
        router: { basepath: base },
        server: { entry: "server" },
        prerender: {
          enabled: true,
          autoStaticPathsDiscovery: false,
          crawlLinks: false,
          failOnError: true,
        },
        pages: [{ path: "/" }],
      }),
      nitro(),
      react(),
    ],
    resolve: { dedupe: ["react", "react-dom", "@tanstack/react-query"] },
  };
});
