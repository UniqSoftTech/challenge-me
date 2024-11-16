import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/modal.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00CC66"
        },
        secondary: {
          DEFAULT: "#FFD700"
        }
      },
    },
  },
  plugins: [nextui()],
};
export default config;
