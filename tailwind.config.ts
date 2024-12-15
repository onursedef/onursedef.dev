import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono Variable", "monospace"],
      },
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              '.prose-pre\\:p-0': {
                '&:is(:where(pre):not(:where([class~="shiki"],[class~="nord"],[class~="not-prose"],[class~="not-prose"] *)))': {
                  padding: 0,
                }
              }
            }
          }
        }
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
