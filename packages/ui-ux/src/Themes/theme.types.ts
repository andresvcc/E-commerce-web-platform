type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

/*******************************************
DEFAULT TYPES UNITS
******************************************/
export type PropsStyle = { [key: string]: string | number };
export type HexColor = `#${string}` | 'transparent';
export type HexShadow = `${number}px ${number}px ${number}px ${number}px ${HexColor}`;
export type Width = 'auto' | `${number}px` | `${number}%` | `${number}vw` | `${number}rem`;
export type Height = 'auto' | `${number}px` | `${number}%` | `${number}vh` | `${number}rem`;
export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type TypographieVariant = 'paragraph' | 'title' | 'subtitle' | 'graphics';
export type Opacity = Range<0, 1>;
export type ObjectFit = 'relative' | 'fixed' | 'absolute' | 'cover' | 'contain' | 'none' | 'scale-down';
export type Padding = Range<0, 50>;

/*******************************************
COLORS TYPES
******************************************/
interface Palette extends Array<HexColor> {
  length: 3;
  0: HexColor;
  1: HexColor;
  2: HexColor;
}

export type colorSchemes = {
  readonly main: HexColor;
  readonly text: HexColor;
  readonly buttonText: HexColor;
  readonly shadow: HexShadow;
  readonly palette: Palette;
};

export type ThemeColor = {
  readonly base: colorSchemes;
  readonly light: colorSchemes;
  readonly dark: colorSchemes;
};

export type Colors = {
  readonly default: ThemeColor;
  readonly primary: ThemeColor;
  readonly secondary: ThemeColor;
  readonly palette: { [key: string]: HexColor[] };
  readonly keyColors: { [key: string]: { [key: string]: HexColor } };
};

/*******************************************
TYPOGRAPHIE TYPES
******************************************/
export type typographie = {
  fontFamily?: string;
  fontSize?: string;
};

export type Typographies = {
  button: typographie;
  title: typographie;
  subtitle: typographie;
  paragraph: typographie;
  graphics: typographie;
};
