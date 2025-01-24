/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B4252', // muted blue
                secondary: '#D8DEE9', // gray
                accent: '#88C0D0', // soft teal
                muted: '#ECEFF4', // warm beige
                error: '#BF616A', // muted red
                success: '#A3BE8C', // soft green
            },
        },
    },
    plugins: [],
};