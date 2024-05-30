import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { containedBase, outlinedBase, textBase } from './button.styles';
import { ButtonProps } from './button.types';
import { colors } from '../../Themes/MainTheme/theme.colors';

const Default = styled(motion.button)`
  ${(props) => (!props.theme.variant || props.theme.variant === 'contained' ? containedBase(props) : '')}
  ${(props) => (props.theme.variant === 'outlined' ? outlinedBase(props) : '')} 
  ${(props) => (props.theme.variant === 'text' ? textBase(props) : '')}
`;

Default.defaultProps = {
  theme: {
    bgGradient: undefined,
    bgcolor: colors.default.base.main,
    textcolor: colors.default.base.buttonText,
    variant: 'contained',
    width: '100%',
  },
};

export function Button({ children, onClick, type, ...rest }: ButtonProps) {
  return (
    <Default
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      type={type}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      whileTap={{ scale: 1 }}
      onClick={onClick}
      theme={{ ...Default.defaultProps?.theme, ...rest }}
    >
      {children}
    </Default>
  );
}
