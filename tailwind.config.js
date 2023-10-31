/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./dist/*.html', './dist/**/*.js'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
			},
			container: {
				center: true,
			},
			colors: {
				"darkIndigo": "#221451"
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['synthwave'],
	},
}
