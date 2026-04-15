import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],

  theme: {
  	extend: {
  		colors: {
  			creme: '#fcf9f6',
  			charcoal: '#2E2E2E',
  			ouro: {
  				DEFAULT: '#9b6c4a',
  				hover: '#7a5339'
  			},
  			azul: '#00A5D6',
  			'azul-escuro': '#001a33',
  			cobre: '#C08A63',
  			marrom: '#9b6c4a',
  			success: '#2D8F4E',
  			warning: '#FFB800',
  			error: '#D94040',
  			info: '#00A5D6',
  			surface: {
  				primary: '#FDF1E7',
  				secondary: '#FFFFFF',
  				tertiary: '#2E2E2E'
  			},
  			neutral: {
  				'50': '#FAFAFA',
  				'100': '#F5F5F5',
  				'200': '#E5E5E5',
  				'300': '#D4D4D4',
  				'400': '#A3A3A3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#2E2E2E',
  				'900': '#1A1A1A'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Montserrat',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		fontSize: {
  			xs: [
  				'12px',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			sm: [
  				'14px',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			base: [
  				'16px',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			lg: [
  				'18px',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			xl: [
  				'20px',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			'2xl': [
  				'24px',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'3xl': [
  				'32px',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'4xl': [
  				'40px',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'5xl': [
  				'48px',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'6xl': [
  				'52px',
  				{
  					lineHeight: '1.2'
  				}
  			]
  		},
  		fontWeight: {
  			regular: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700',
  			extrabold: '800'
  		},
  		letterSpacing: {
  			tight: '-0.02em',
  			normal: '0',
  			wide: '0.05em',
  			kicker: '0.15em'
  		},
  		lineHeight: {
  			tight: '1.2',
  			normal: '1.5',
  			relaxed: '1.6',
  			loose: '1.8'
  		},
  		spacing: {
  			'1': '4px',
  			'2': '8px',
  			'3': '12px',
  			'4': '16px',
  			'5': '20px',
  			'6': '24px',
  			'8': '32px',
  			'10': '40px',
  			'12': '48px',
  			'16': '64px',
  			'20': '80px',
  			'24': '96px',
  			'30': '120px',
  			'40': '160px'
  		},
  		borderRadius: {
  			none: '0',
  			sm: '2px',
  			DEFAULT: '4px',
  			lg: '8px',
  			xl: '24px',
  			full: '9999px'
  		},
  		boxShadow: {
  			sm: '0 1px 2px rgba(46, 46, 46, 0.04)',
  			DEFAULT: '0 4px 8px rgba(46, 46, 46, 0.08)',
  			md: '0 4px 8px rgba(46, 46, 46, 0.08)',
  			lg: '0 8px 24px rgba(46, 46, 46, 0.08)',
  			xl: '0 16px 48px rgba(46, 46, 46, 0.12)',
  			none: 'none'
  		},
  		transitionDuration: {
  			fast: '150ms',
  			DEFAULT: '300ms',
  			slow: '500ms'
  		},
  		transitionTimingFunction: {
  			DEFAULT: 'ease',
  			spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  		},
  		zIndex: {
  			base: '0',
  			dropdown: '10',
  			sticky: '20',
  			overlay: '30',
  			modal: '40',
  			toast: '50'
  		},
  		keyframes: {
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'counter-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
  			'fade-in': 'fade-in 0.5s ease-out forwards',
  			'counter-up': 'counter-up 0.5s ease-out forwards',
  			'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backdropBlur: {
  			glass: '15px'
  		}
  	},
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	}
  },

  plugins: [
    // shadcn/ui utiliza tailwindcss-animate
    require("tailwindcss-animate"),
  ],
}

export default config
