/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./dist/index.html', './dist/**/*.js'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
			},
			container: {
				center: true,
			},
			colors: {
				
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['synthwave'],
	},
}
