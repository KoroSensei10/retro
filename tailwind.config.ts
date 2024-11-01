import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				comic: ['Comic Sans MS', 'Comic Sans', 'serif'],
				times: ['Times New Roman', 'Times', 'serif']
			}
		}
	},

	plugins: [typography, forms]
} as Config;
