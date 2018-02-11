import React from 'react';
import { css } from 'react-emotion';
import { spacing, theme, variables } from 'styles';

import ActionMenu from './ActionMenu';
import TitleMenu from './TitleMenu';
import UserMenu from './UserMenu';

const headerStyle = css`
  height: ${variables.Header.height}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${theme.border};
  box-shadow: ${theme.boxShadow};
  padding: ${spacing.internal}px ${spacing.internalBreath}px;
`;

const Header = () => (
  <div className={headerStyle}>
    <TitleMenu />
    <ActionMenu />
    <UserMenu />
  </div>
);

export default Header;
