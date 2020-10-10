module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    // customForms: theme => ({
    //   dark: {
    //     input: {
    //       color: theme('colors.gray.100'),
    //     },
    //   },
    //   default: {
    //     select: {
    //       borderColor: theme('colors.red.600'),
    //       backgroundColor: theme('colors.red.600'),
    //       color: theme('colors.gray.100'),

    //       '&:focus': {
    //         boxShadow: `0 0 0 1px ${theme('colors.red.600')}`,
    //         borderColor: theme('colors.red.600'),
    //       },
    //     },
    //   },
    // }),
    extend: {
      boxShadow: {
        navCategory: '0 5px 4px 0 rgba(0,0,0,0.18)',
      },
      screens: {
        xs: '320px',
      },
      fontFamily: {
        body: ['Open Sans'],
        cairo: ['Cairo'],
      },
      colors: {
        'cadet-blue': '#5F9EA0',
        'nav-primary': '#cb3c2c',
        'nav-secondary': '#fff',
        teal: '#008080 ',
        'nav-gradient-from': '#eaaeae',
        'nav-gradient-to': '#9d0707',
        aliceblue: '#F0F8FF',
      },
      spacing: {
        '1p': '1px',
        '2p': '2px',
        '3p': '3px',
        '4p': '4px',
        '5p': '5px',
        '20p': '20px',
        '25p': '25px',
        '30p': '30px',
        '35p': '35px',
        n57p: '-57px',
        '54p': '54px',
      },
      inset: {
        '1/2': '50%',
        '33p': '33%',
        '36p': '36%',
        10: '10px',
        8: '8px',
        n2: '-2px',
        2: '2px',
        n1: '-1px',
        1: '1px',
        50: '50px',
        100: '100%',
        n25: '-25px',
        n42: '-42px',
      },
      translate: {
        'n1/2': '-50%',
      },
      minWidth: {
        700: '700px',
        135: '135px',
        '50p': '50%',
        '75p': '75%',
      },
      minHeight: {
        243: '243px',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-in forwards ',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
};
