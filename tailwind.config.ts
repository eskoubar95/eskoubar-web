import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					primary: {
						50: '#f0f9ff',
						100: '#e0f2fe',
						200: '#bae6fd',
						300: '#7dd3fc',
						400: '#38bdf8',
						500: '#0ea5e9',
						600: '#0284c7',
						700: '#0369a1',
						800: '#075985',
						900: '#0c4a6e',
						950: '#082f49', // Electric Blue Accent
					},
					secondary: {
						50: '#faf5ff',
						100: '#f3e8ff',
						200: '#e9d5ff',
						300: '#d8b4fe',
						400: '#c084fc',
						500: '#a855f7',
						600: '#9333ea',
						700: '#7e22ce',
						800: '#6b21a8',
						900: '#581c87',
						950: '#3b0764',
					},
					neutral: {
						50: '#fafafa', // Text High Contrast
						100: '#f5f5f5',
						200: '#e5e5e5',
						300: '#d4d4d4',
						400: '#a3a3a3', // Text Muted
						500: '#737373',
						600: '#525252',
						700: '#404040', // Borders
						800: '#262626', // Surface Lighter
						900: '#171717', // Surface Default
						950: '#050505', // Background Darkest
					},
				},
			},
			fontFamily: {
				sans: [
					'var(--font-main)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
				],
			},
			fontWeight: {
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
			},
		},
	},
	plugins: [],
};
export default config;
