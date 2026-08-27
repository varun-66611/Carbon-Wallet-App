import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				eco: {
					excellent: 'hsl(var(--eco-excellent))',
					good: 'hsl(var(--eco-good))',
					fair: 'hsl(var(--eco-fair))',
					poor: 'hsl(var(--eco-poor))',
					critical: 'hsl(var(--eco-critical))'
				},
				emerald: 'hsl(var(--emerald))',
				sapphire: 'hsl(var(--sapphire))',
				amethyst: 'hsl(var(--amethyst))',
				coral: 'hsl(var(--coral))',
				gold: 'hsl(var(--gold))',
				rose: 'hsl(var(--rose))',
				cyan: 'hsl(var(--cyan))',
				lime: 'hsl(var(--lime))'
			},
			backgroundImage: {
				'gradient-eco': 'var(--gradient-eco)',
				'gradient-ocean': 'var(--gradient-ocean)',
				'gradient-sunset': 'var(--gradient-sunset)',
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-spring': 'var(--gradient-spring)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},
			boxShadow: {
				'eco': 'var(--shadow-eco)',
				'ocean': 'var(--shadow-ocean)',
				'sunset': 'var(--shadow-sunset)',
				'aurora': 'var(--shadow-aurora)',
				'glow': 'var(--shadow-glow)'
			},
			transitionTimingFunction: {
				'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
