import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			fontFamily: {
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: [
			{
				custom: {
					primary: '#89CFF0',
					secondary: '#E6E6E6',
					accent: '#A2D9A4',

					neutral: '#31252a',
					'base-100': '#fcfcfc',
					info: '#009ad2',
					success: '#00a452',
					warning: '#fac000',
					error: '#ff0034',
				},
			},
		],
	},
};
