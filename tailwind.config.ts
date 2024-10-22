
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			mob: {
  				max: '640px'
  			}
  		},
  		colors: {
  			background: 'rgba(var(--background))',
  			foreground: 'rgba(var(--foreground))',
			"foreground-secondary": 'rgba(var(--foreground-secondary))',
			"background-secondary": 'rgba(var(--background-secondary))',
  			warning: 'rgba(var(--warning))',
  			success: 'rgba(var(--success))',
  			danger: 'rgba(var(--danger))',
  			info: 'rgba(var(--info))',
  			text: 'rgba(var(--text))',
  			border: 'rgba(var(--border))',
  			contrast: 'rgba(var(--contrast))',
  			

  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class", "class"],
};
export default config;
