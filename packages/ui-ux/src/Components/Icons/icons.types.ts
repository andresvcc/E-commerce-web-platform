import { MouseEvent } from 'react';
import { Height, HexColor, Width } from '../../Themes/theme.types';

export interface SvgPallette extends Array<HexColor> {
  length: 0 | 1 | 2 | 3 | 4 | 5;
  0: HexColor;
}

export type SVGThemeProps = {
  theme: {
    palleteFill?: SvgPallette;
    palleteFillHover?: SvgPallette;
  };
};

export interface IconProps {
  ref?: React.Ref<HTMLElement>;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  bgcolor?: HexColor;
  bgRound?: boolean;
  palleteFill?: SvgPallette;
  palleteFillHover?: SvgPallette;
  name: string;
  sizeW?: number | Width;
  sizeH?: number | Height;
  rotate?: number;
  style?: React.CSSProperties;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}

export interface SVGProps {
  ref?: any;
  palleteFill?: SvgPallette;
}
