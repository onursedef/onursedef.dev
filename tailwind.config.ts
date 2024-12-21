import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';


export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	],
	theme: {
		extend: {
			fontFamily: {
				jetbrains: ['JetBrains Mono Variable', 'monospace'],
				dmMono: ['DM Mono', 'monospace'],
				nunito: ['Nunito Variable', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			}
		}
	},

	plugins: [typography]
} satisfies Config;
