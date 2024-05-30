import { MouseEvent, ReactNode } from 'react';
import { Height, HexColor, PropsStyle } from '../../Themes/theme.types';

export interface NavBarProps {
  children?: ReactNode;
  style?: PropsStyle;
  bgcolor?: HexColor;
  bgGradient?: HexColor;
  textcolor?: HexColor;
  height?: Height;
}
