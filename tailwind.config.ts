import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat Variable', 'sans-serif'],
				inter: ['Inter Variable', 'sans-serif'],
				jetbrains: ['JetBrains Mono Variable', 'monospace']
			}
		}
	},
	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
