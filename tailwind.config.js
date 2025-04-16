/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class", "class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui']
        },
        extend: {
            colors: {
                white: '#FFFFFF',
                success: '#16A8E1',
                successLight: '#82D5F7',
                warning: '#DB8C23',
                warningLight: 'rgba(219,140,35,0.38)',
                danger: '#B10303',
                dangerLight: 'rgba(177,3,3,0.38)',
                brand01: {
                    '100': '#82D5F7',
                    '200': '#3FC0F1',
                    DEFAULT: '#16A8E1'
                },
                brand01Tint40: {
                    DEFAULT: '#E1F3FD'
                },
                brand01Tint30: {
                    DEFAULT: '#BDE7FA'
                },
                brand01Shade40: {
                    DEFAULT: '#104C6A'
                },
                brand02: {
                    DEFAULT: '#DB8C23'
                },
                brand03: {
                    DEFAULT: '#1B1B1B'
                },
                greenFrom: '#0A88BF',
                greenTo: '#16A8E1',
                linearGreen: {
                    '0': '#0A88BF',
                    '100': '#16A8E1'
                },
                linearYellow: {
                    '0%': '#DB8C23',
                    '100%': '#E9B85B'
                },
                linearBlack: {
                    '0%': '#262626',
                    '100%': '#3D3D3D'
                },
                neutrals: {
                    '50': '#FCFCFD',
                    '100': '#F9F9FB',
                    '200': '#EBEBEF',
                    '300': '#DDDDE3',
                    '400': '#D3D4DB',
                    '500': '#B9BBC6',
                    '600': '#8B8D98',
                    '700': '#7E808A',
                    '800': '#60646C',
                    '900': '#1C2024'
                },
                background: {
                    DEFAULT: '#F6F6F6'
                },
                semantics: {
                    green01: '#1CBF8E',
                    green02: '#12D56A',
                    green03: '#12D56A',
                    yellow01: '#904918',
                    yellow02: '#E09C2F',
                    yellow03: '#F7ECCA',
                    grey01: '#454545',
                    grey02: '#6D6D6D',
                    grey03: '#E7E7E7',
                    red01: '#B10303',
                    red02: '#FF0303',
                    red03: '#FFDDDD'
                },
                accent: {
                    a01: '#F9A92A',
                    systemBlue: '#007AFF'
                },
                lineActive: {
                    DEFAULT: '#F9A92A'
                },
                required: {
                    DEFAULT: '#cd220c'
                },
                backgroundContent:{
                    DEFAULT: '#F6F6F6'
                },
                darkGrey: {
                    '2727': '#272727',
                    '3333': '#333333',
                    '3636': '#363636',
                    '3838': '#383838',
                    'A804033-20': 'rgba(10, 128, 64, 0.2)',
                    '2C2C': '#2C2C2C',
                    '3838-important': '#383838 !important',
                    '2E2E': '#2E2E2E'
                }
            },
            boxShadow: {
                'custom-1': '0px 3px 1px 0px rgba(0, 0, 0, 0.06)',
                'custom-2': '0px 3px 8px 0px rgba(0, 0, 0, 0.15)',
                'custom-3': '0px 0px 0px 1px rgba(0, 0, 0, 0.04)',
                'light-1': '0px 0px 1px 0px #0000000F',
                'light-2': '1px 0px 8px 0px #00000026',
                'light-3': '0px 2px 0px 1px #0000000A',
                'button-1': '1px 0px 8px 0px #00000026'
            },
            backgroundImage: {
                'gradient-green': 'linear-gradient(to right, #0A88BF, #16A8E1)',
                'gradient-green-disabled': 'linear-gradient(to right, #3FC0F1, #3FC0F1)',
                'gradient-green-press': 'linear-gradient(to right, #16A8E1, #16A8E1)'
            },
            text: {
                'gradient-text-green': 'linear-gradient(to right, #0A8040, #16A8E1)'
            },
            borderImage: {
                'gradient-green': 'linear-gradient(to right, #0A8040, #16A8E1)'
            },
            backgroundColor: {
                'rgba-black-12': 'rgba(0, 0, 0, 0.12)'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [
        function ({addUtilities}) {
            addUtilities({
                '.border-gradient-green': {
                    borderImage: 'linear-gradient(to right, #0A8040, #16A8E1) 1',
                },
            });
        },
        require("tailwindcss-animate")
    ],
}
