/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
    extend: {
        colors: {
            primaryColor: "#4E9393",
            primaryColorDark: "#1a0e08",
            primaryColorLight: "#4c3c2b",
            secondaryColor: "#D4D8D6",
            secondaryColorDark: "#919191",
            secondaryColorLight: "#f0f3f2",
            bgGray: "#dedede",
            bgGrayDark: "#bcbcbc",
            bgGrayLight: "#f0f0f0",
            tertiaryOrange: "#db9068",
            tertiaryOrangeDark: "#9f5f3f",
            tertiaryOrangeLight: "#EB9F74",
            error: "#FF0000",
            info: "#60A5FA",
            success: "#00DD00",
            warn: "#FBBF24",
            loading: "#3B82F6",
        },
        boxShadow: {
            custom3: '0px 5px 15px rgba(0, 0, 0, 0.35)',
            custom5: '0px 3px 8px rgba(0, 0, 0, 0.24)',
            custom6: 'rgba(0, 0, 0, 0.12) 0px 1px 4px',
        },
        //   background: linear-gradient(to right, #4ca1af, #2c3e50);
        backgroundImage: {
            'bg-gradient-to-r': 'linear-gradient(to right, #4ca1af, #2c3e50)',
            'bg-gradient-to-l': 'linear-gradient(to left, #4ca1af, #2c3e50)',
            'bg-gradient-to-t': 'linear-gradient(to top, #4ca1af, #2c3e50)',
            'bg-gradient-to-b': 'linear-gradient(to bottom, #4ca1af, #2c3e50)',
            'bg-conic-gradient': 'conic-gradient(from 180deg at 50% 50%, #529C9D 0deg, #3B7576 360deg)',
            'bg-conic-gradient-2': 'conic-gradient(from 180deg at 50% 50%, #4ca1af 0deg, #2c3e50 360deg)',
            'bg-conic-gradient-3': 'conic-gradient(from 180deg at 50% 50%, #4E9393 0deg, #1a0e08 360deg)',
            'bg-conic-gradient-4': 'conic-gradient(from 180deg at 50% 50%, #4E9393 0deg, #4c3c2b 360deg)',
            'bg-conic-gradient-5': 'conic-gradient(from 180deg at 50% 50%, #D4D8D6 0deg, #919191 360deg)',
        },
    },
};
export const plugins = [];



