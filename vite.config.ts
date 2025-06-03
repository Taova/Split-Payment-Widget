import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    plugins: [
      tailwindcss(),
      react(),
      // visualizer({ open: false }),
    ],
    build: {
      lib: {
        entry: "src/main.tsx",
        name: "SeQuraWidget",
        fileName: "widget",
        formats: ["iife"],
      },
      outDir: "dist",
      minify: "esbuild",
      sourcemap: isDev,
      rollupOptions: {
        treeshake: true,
      },
    },
  };
});
