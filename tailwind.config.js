module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
      fontFamily: {
        body: ['Nunito'],
        cairo: ['Cairo'],
      },
      colors: {
        'cadet-blue': '#5F9EA0',
        'nav-primary': '#f56565',
        'nav-secondary': '#fff',
        teal: '#008080 ',
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
        n54p: '-54px',
        '54p': '54px',
      },
      inset: {
        '1/2': '50%',
        '33p': '33%',
        '36p': '36%',
        10: '10px',
        n2: '-2px',
        2: '2px',
        n1: '-1px',
        1: '1px',
        50: '50px',
        100: '100%',
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
  plugins: [],
};
