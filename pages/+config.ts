import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

const config: Config = {
  // https://vike.dev/head-tags
  title: "Bibliotheca",
  description: "Books",

  extends: [vikeReact],
  prerender: true,
  meta: {
    Page: {
      env: {
        // HTML-only for all pages
        server: true,
        client: false,
      },
    },
  },
};

export default config;
