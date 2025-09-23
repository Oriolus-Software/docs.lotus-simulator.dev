// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapidePlugin from "starlight-theme-rapide";
import mdx from "@astrojs/mdx";
import rehypeMermaid, { type RehypeMermaidOptions } from "rehype-mermaid";

export default defineConfig({
  site: "https://docs.lotus-simulator.dev",

  redirects: {
    "/": "/en/",
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  integrations: [
    starlight({
      plugins: [starlightThemeRapidePlugin()],
      title: "LOTUS-Simulator NG - Developer Documentation",
      favicon: "/favicon.ico",
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
          lang: "en",
        },
        de: {
          label: "Deutsch",
          lang: "de",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Oriolus-Software/docs.lotus-simulator.dev",
        },
      ],
      sidebar: [
        {
          label: "General",
          items: [
            {
              label: "Introduction",
              slug: "introduction",
            },
            {
              label: "Script Sharing",
              slug: "script-sharing",
            },
          ],
        },
        {
          label: "lotus-sc",
          items: [
            {
              label: "Overview",
              slug: "lotus-sc/overview",
            },
            {
              label: "Configuration",
              slug: "lotus-sc/configuration",
            },
          ],
        },
        {
          label: "Rust",
          items: [
            {
              label: "Introduction",
              slug: "rust/introduction",
            },
            {
              label: "Quickstart",
              slug: "rust/quickstart",
            },
            {
              label: "Recommendations",
              slug: "rust/recommendations",
            },
            {
              label: "Logging",
              slug: "rust/logging",
            },
            {
              label: "Variables",
              slug: "rust/variables",
            },
            {
              label: "Messages",
              slug: "rust/messages",
            },
            {
              label: "Input",
              slug: "rust/input",
            },
            {
              label: "Vehicle",
              slug: "rust/vehicle",
            },
            {
              label: "Textures",
              slug: "rust/textures",
            },
            {
              label: "Time",
              slug: "rust/time",
            },
            {
              label: "RNG",
              slug: "rust/rng",
            },
            {
              label: "Asset Preloading",
              slug: "rust/asset-preloading",
            },
            {
              label: "Gizmos",
              slug: "rust/gizmos",
            },
          ],
        },
        {
          label: "Plugin API",
          items: [
            {
              label: "Introduction",
              slug: "plugin-api/introduction",
            },
            {
              label: "GET /release-info",
              slug: "plugin-api/release-info",
            },
            {
              label: "POST /input/action",
              slug: "plugin-api/input-action",
            },
            {
              label: "GET /scripts",
              slug: "plugin-api/scripts",
            },
            {
              label: "GET /scripts/{id}",
              slug: "plugin-api/script-details",
            },
            {
              label: "GET /scripts/{id}/textures/{name}",
              slug: "plugin-api/script-details-textures",
            },
            {
              label: "PUT /scripts/{id}/variables",
              slug: "plugin-api/script-variables",
            },
            {
              label: "POST /scripts/{id}/messages",
              slug: "plugin-api/script-messages",
            },
          ],
        },
        {
          label: "WASM",
          items: [
            {
              label: "API",
              slug: "wasm/api",
            },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
    ,
    mdx(),
  ],
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          dark: true,
          strategy: "img-svg",
        } satisfies RehypeMermaidOptions,
      ],
    ],
  },
});
