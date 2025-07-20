/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'custom-bg': "url('./assets/images/background.jpg')"
            },
        },
    },
    plugins: [],
}