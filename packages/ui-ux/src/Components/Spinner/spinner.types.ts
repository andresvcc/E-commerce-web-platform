import { MouseEvent } from 'react';
import { HexColor, PropsStyle } from '../../Themes/theme.types';

type Ran<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;

export interface SpinnerProps {
  name?: string;
  size?: Ran<400>;
  color?: HexColor;
  style?: PropsStyle;
  speed?: Ran<200>;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}
