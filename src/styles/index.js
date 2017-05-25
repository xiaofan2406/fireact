import * as palette from './colors';

export * as colors from './colors';

export const theme = {
  primaryColor: palette.blue800,
  primaryAccent: palette.blue100,
  border: `1px solid ${palette.grey200}`,
  borderTransparent: '1px solid transparent',
  boxShadow: `0 1px 6px ${palette.grey200}`,
  fontSize: 14,
  headingSize: 16
};

export const size = {
  unit: 6,
  small: 12,
  regular: 20,
  large: 32
};

export const spacing = {
  unit: 2,
  internal: 6,
  internalBreath: 12,
  external: 8,
  externalBreath: 24
};

export const variables = {
  BoardHeader: {
    height: 48
  },
  Header: {
    height: 42
  },
  ListMenu: {
    button: {
      width: 48
    }
  },
  ItemDisplay: {
    minHeight: 32
  },
  ItemCheckbox: {
    width: 14
  }
};
