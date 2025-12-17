/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#135bed",
                "background-light": "#f6f6f8",
                "background-dark": "#FAFAFA",
                "surface-light": "#ffffff",
                "surface-dark": "#135bed",
                text: {
                    main: "#101622",
                    muted: "#616f89",
                },
                neutral: {
                    light: "#f0f2f4",
                    input: "#dbdfe6",
                },
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
}
