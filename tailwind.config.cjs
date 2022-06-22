const plugin = require('tailwindcss/plugin');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	mode: 'jit',

	theme: {
		extend: {}
	},

	plugins: [
		plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        body: {
          color: theme('colors.slate.700'),
          backgroundColor: theme('colors.slate.50'),
          minHeight: '100vh',
        },
        h1: {
          fontSize: theme('fontSize.4xl'),
          fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.snug'),
        },
        h2: {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.snug'),
        },
        h3: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.snug'),
        },
        h4: {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.snug'),
        },
        h5: {
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.snug'),
        },
        h6: {
          fontSize: theme('fontSize.md'),
          fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.snug'),
        },
				blockquote: {
          backgroundColor: theme('colors.slate.100'),
					margin: `${theme('margin.4')} 0`,
					padding: `${theme('padding.4')} ${theme('padding.6')}`,
					borderRadius: '1rem',
					textAlign: 'left',
					border: `1px solid ${theme('colors.slate.200')}`
				},
      });

			addComponents({
				'.btn': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: theme('padding.3'),
					paddingRight: theme('padding.3'),
					paddingTop: theme('padding.2'),
					paddingBottom: theme('padding.2'),
					margin: theme('margin.1'),
					borderWidth: theme('borderWidth.2'),
					fontWeight: theme('fontWeight.bold'),
					minWidth: '120px',
					transitionDuration: theme('transitionDuration.300'),
					'&:hover': {
						transform: `scale(${theme('scale.105')})`,
						boxShadow: theme('boxShadow.lg'),
					},
					'&:focus': {
						transform: `scale(${theme('scale.105')})`,
						boxShadow: theme('boxShadow.lg'),
					},
					'&:disabled': {
						transform: 'none !important',
						filter: 'none !important',
						boxShadow: 'none !important',
						cursor: 'default !important',
						opacity: '0.6 !important',
					},
				},
			});

			addUtilities({
				'.center-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				'.ellipsize': {
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
				},
				'.h-min-content': {
					minHeight: 'calc(100vh - 60px)'
				},
				'.h-max-content': {
					maxHeight: 'calc(100vh - 60px)'
				},
			});
    }),
	],
}

module.exports = config
