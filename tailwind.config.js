/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#27AE60",
                secondary: "#E8F5FF",
                tertiary: "#B7DFFF",
            },
        },
    },
    plugins: [],
};
