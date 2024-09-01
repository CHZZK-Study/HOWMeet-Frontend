const typo = {
  heading: {
    bold: {
      24: `
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
      `,
      22: `
        font-size: 22px;
        font-weight: 700;
        line-height: 26px;
      `,
      20: `
        font-size: 20px;
        font-weight: 700;
        line-height: 36px;
      `,
      16: `
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
      `,
    },
  },
  body: {
    semi_bold: {
      24: `
          font-size: 24px;
          font-weight: 600;
          line-height: 36px;
      `,
      22: `
          font-size: 22px;
          font-weight: 600;
          line-height: 26.25px;
        `,
      20: `
          font-size: 20px;
          font-weight: 600;
          line-height: 30px;
      `,
      19: `
          font-size: 19px;
          font-weight: 600;
          line-height: 24.7px;
       `,
      18: `
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
        `,
      16: `
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
        `,
      15: `
          font-size: 15px;
          font-weight: 600;
          line-height: 17.9px;
      `,
      13: `
          font-size: 13px;
          font-weight: 600;
          line-height: 19.5px;
      `,
      12: `
          font-size: 12px;
          font-weight: 600;
          line-height: 18px;
        `,
    },
    medium: {
      22: `
        font-size: 22px;
        font-weight: 500;
        line-height: 30.8px;
      `,
      20: `
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
      `,
      18: `
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
      `,
      16: `
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
      `,
      14: `
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
      `,
    },
    regular: {
      22: `
        font-size: 22px;
        font-weight: 400;
        line-height: 30.8px;
      `,
      18: `
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
      `,
      16: `
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      `,
      12: `
        font-size: 12px;
        font-weight: 400;
        line-height: 15.6px;
      `,
    },
  },
};

const color = {
  point: {
    purple: '#642DFF',
    green: '#17B609',
  },

  primary: {
    black: '#081837',
    white: '#fff',
  },
  secondary: {
    solid: {
      bk: {
        900: '#222325',
        800: '#3A3C40',
        700: '#53555B',
        600: '#84888F',
        500: '#9FA2A7',
        400: '#BABCC0',
        300: '#CFD0D3',
        200: '#DFE0E2',
        100: '#EAEAEC',
        50: '#F4F5F5',
      },
      green: {
        8: 'rgba(65, 211, 53, 0.2)',
        1: 'rgba(23, 182, 9, 1)',
      },
      gray: {
        800: '#4C545C',
      },
      red: {
        red: 'rgba(243, 72, 34, 1)',
      },
    },
    transparent: {
      bk: {
        op80: 'rgba(8, 24, 55, 0.8)',
        op64: 'rgba(8, 24, 55, 0.64)',
        op48: 'rgba(8, 24, 55, 0.48)',
        op40: 'rgba(8, 24, 55, 0.40)',
        op20: 'rgba(8, 24, 55, 0.20)',
        op16: 'rgba(8, 24, 55, 0.16)',
        op12: 'rgba(8, 24, 55, 0.12)',
        op8: 'rgba(8, 24, 55, 0.08)',
        op4: 'rgba(8, 24, 55, 0.04)',
        op2: 'rgba(8, 24, 55, 0.02)',
      },
    },
  },
};

const theme = {
  typo,
  color,
} as const;

export default theme;
