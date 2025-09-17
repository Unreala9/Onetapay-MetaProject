/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Manrope',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		colors: {
  			ink: '#1F2937',
  			sub: '#6B7280',
  			orangepill: '#FF4D2E',
  			orangepillHover: '#E94525',
  			ring1: '#FF7A59',
  			ring2: '#FFD1C2',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		dropShadow: {
  			phone: [
  				'0 40px 50px rgba(0,0,0,.12)',
  				'0 10px 20px rgba(0,0,0,.06)'
  			]
  		},
  		boxShadow: {
  			soft: '0 10px 30px rgba(0,0,0,.08)',
  			float: '0 12px 40px rgba(31,41,55,.16)',
  			insetCard: 'inset 0 0 0 1px rgba(255,255,255,.12)'
  		},
  		keyframes: {
  			floaty: {
  				'0%,100%': {
  					transform: 'translateY(0) rotate(-6deg)'
  				},
  				'50%': {
  					transform: 'translateY(-10px) rotate(-6deg)'
  				}
  			},
  			floaty2: {
  				'0%,100%': {
  					transform: 'translateY(0) rotate(8deg)'
  				},
  				'50%': {
  					transform: 'translateY(-8px) rotate(8deg)'
  				}
  			},
  			gently: {
  				'0%,100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-8px)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(-50%)'
  				}
  			}
  		},
  		animation: {
  			floaty: 'floaty 5s ease-in-out infinite',
  			floaty2: 'floaty2 6s ease-in-out infinite',
  			gently: 'gently 7s ease-in-out infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
