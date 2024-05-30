import { MouseEvent, ReactNode } from 'react';
import { ButtonVariant, HexColor, PropsStyle, Width } from '../../Themes/theme.types';

export interface ButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  style?: PropsStyle;
  bgcolor?: HexColor;
  bgGradient?: HexColor;
  textcolor?: HexColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: 'default' | 'small' | 'large';
  indicator?: 'loading' | 'success' | 'warning' | 'error';
  width?: Width;
}
