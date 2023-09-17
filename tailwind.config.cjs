/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
        "hero-light": "4px 4px #9ca3af",
        "hero-dark": " 4px 4px #1f2937",
        "about-light": "2px 2px #d1d5db",
        "about-dark": "2px 2px #374151",
      },
      filter: {
        "curstom-inverted": "invert(1)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          filter: (value) => ({
            filter: value,
          }),
        },
        { values: theme("filter") }
      );
    }),
    require("@tailwindcss/forms"),
  ],
};
