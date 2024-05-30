import { MouseEvent, ReactNode } from 'react';
import { ButtonVariant, HexColor, PropsStyle, Width } from '../../Themes/theme.types';

export interface ButtonPlayProps {
  children?: ReactNode;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  style?: PropsStyle;
  bgcolor?: HexColor;
  bgGradient?: HexColor;
  textcolor?: HexColor;
  disabled?: boolean;
  size?: 'default' | 'small' | 'large';
  isPlay?: boolean;
  width?: Width;
}
