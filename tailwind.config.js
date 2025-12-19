
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
                body: "#101622",
                subtle: "#616f89",
                divider: "#f0f2f4",
                field: "#dbdfe6",
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
}
