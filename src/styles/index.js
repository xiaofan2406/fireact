import * as palette from './colors';

export * as colors from './colors';

export const fontSizes = {
  small: 12,
  regular: 14,
  large: 18
};

export const sizes = {
  unit: 6,
  small: 12,
  regular: 20,
  large: 32
};

export const theme = {
  primaryColor: palette.blue800,
  primaryAccent: palette.blue100,
  border: `1px solid ${palette.grey200}`,
  borderTransparent: '1px solid transparent',
  boxShadow: `0 1px 6px ${palette.grey200}`,
  fontSize: fontSizes.regular,
  headingSize: 16
};

export const spacing = {
  unit: 2,
  internal: 6,
  internalBreath: 12,
  external: 8,
  externalBreath: 24
};

export const variables = {
  Layout: {
    minWidth: 320,
    minHeight: 460
  },
  Header: {
    height: 46,
    titleMenuWidth: 64
  },
  ContentStatus: {
    width: 360,
    height: 128
  },
  ItemDisplay: {
    minHeight: 32
  },
  ItemCheckbox: {
    width: 14
  },
  ItemMeta: {
    lineHeight: 1.2
  }
};
