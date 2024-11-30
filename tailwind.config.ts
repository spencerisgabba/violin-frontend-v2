import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|autocomplete|breadcrumbs|divider|dropdown|input|modal|pagination|skeleton|slider|spinner|table|button|ripple|listbox|popover|scroll-shadow|menu|checkbox|spacer).js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        dablue: "var(--dablue)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
