import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";

export default defineConfig({
  base: "/bibliotheca/",
  plugins: [
    vike(),
    react(),
    tailwindcss(),
    mdPlugin({
      mode: [Mode.HTML],
    }),
  ],
});
