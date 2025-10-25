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
      title: "LOTUS Simulator - Dev",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Oriolus-Software",
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
              label: "Async-Baukasten",
              items: [
                {
                  label: "Einstieg und Motivation",
                  slug: "rust/async/start_d",
                },
                {
                  label: "Konzept",
                  slug: "rust/async/concept_d",
                }, 
                {
                  label: "Beispiele",
                  slug: "rust/async/examples_d",
                },
                {
                  label: "Einbau ins Fahrzeugscript",
                  slug: "rust/async/using_d",
                },
                {
                  label: "Bausteine",
                  slug: "rust/async/elements_d",
                },
                {
                  label: "Eigene Bausteine erstellen",
                  slug: "rust/async/own_modules_d",
                },
              ],
            },
            {
              label: "Builder",
              slug: "rust/builder_d",
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
