// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapidePlugin from "starlight-theme-rapide";
import mdx from "@astrojs/mdx";
import rehypeMermaid, { type RehypeMermaidOptions } from "rehype-mermaid";

export default defineConfig({
  site: "https://docs.lotus-simulator.dev",

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  integrations: [
    starlight({
      plugins: [starlightThemeRapidePlugin()],
      title: "LOTUS-Simulator NG - Developer Documentation",
      favicon: "/favicon.ico",
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
