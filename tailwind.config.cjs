/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/collections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/globals/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  theme: {
  	extend: {
  		maxWidth: {
  			container: '1400px'
  		},
  		colors: {
  			'ds-dark-blue': '#3d426a',
  			'ds-pastille-green': '#547b82',
  			'ds-accent-yellow': '#faa636',
  			'ds-light-neutral': '#efefee',
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
  		backgroundImage: {
  			'gradient-primary': 'linear-gradient(to right, #3D426A 0%, #547B82 100%)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-poppins)',
  				'Poppins',
  				'sans-serif'
  			],
  			heading: [
  				'var(--font-poppins)',
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		fontWeight: {
  			light: '300',
  			semibold: '600'
  		},
  		animation: {
  			'fade-in-down': 'fadeInDown 0.2s ease-out',
  			'fade-out-up': 'fadeOutUp 0.15s ease-in',
  			'slide-in': 'slideIn 0.2s ease-out',
  			'slide-out': 'slideOut 0.15s ease-in'
  		},
  		keyframes: {
  			fadeInDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeOutUp: {
  				'0%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				}
  			},
  			slideIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scaleY(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scaleY(1)'
  				}
  			},
  			slideOut: {
  				'0%': {
  					opacity: '1',
  					transform: 'scaleY(1)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'scaleY(0.95)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
}
