import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { containedBase } from './navBar.styles';
import { NavBarProps } from './navBar.types';
import { colors } from '../../Themes/MainTheme/theme.colors';

const Default = styled(motion.div)`
  ${(props) => (!props.theme.variant || props.theme.variant === 'contained' ? containedBase(props) : '')}
`;

Default.defaultProps = {
  theme: {
    bgGradient: undefined,
    bgcolor: colors.default.base.main,
    textcolor: colors.default.base.buttonText,
    variant: 'contained',
    height: 'auto',
  },
};

export function NavBar({ children, ...rest }: NavBarProps) {
  return (
    <Default theme={{ ...Default.defaultProps?.theme, ...rest }} {...rest}>
      {children}
    </Default>
  );
}
