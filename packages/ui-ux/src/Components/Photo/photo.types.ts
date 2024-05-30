import { MouseEvent } from 'react';
import { ObjectFit, Height, HexColor, PropsStyle, Width, Padding } from '../../Themes/theme.types';

type PhotoSRC = string;

export interface PhotoProps {
  src: PhotoSRC;
  alt?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  style?: PropsStyle;
  bgcolor?: HexColor;
  width?: Width;
  height?: Height;
  objectFit?: ObjectFit;
  paddingY?: Padding;
  paddingX?: Padding;
  hoverEffect?: 'none' | 'opacity';
}
