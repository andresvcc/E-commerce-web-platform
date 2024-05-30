import { MouseEvent, ReactNode } from 'react';
import { TypographieVariant, HexColor, PropsStyle } from '../../Themes/theme.types';

export interface TypographieProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  style?: PropsStyle;
  color?: HexColor;
  colorGradient?: HexColor;
  variant?: TypographieVariant;
  align?: 'center' | 'left' | 'right' | 'justify';
  size?:
    | `${string}rem`
    | `${string}em`
    | `${string}px`
    | `${string}vw`
    | `${string}vh`
    | `${string}%`
    | `min(${string})`
    | `max(${string})`;
  font?: string;
}
