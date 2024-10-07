/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				lexend: ['Lexend', 'sans-serif'],
				'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
			},
			fontSize: {
				'10xl': '16vmax',
			},
		},
	},
	plugins: [],
};
