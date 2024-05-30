import { typographie } from '../../Themes/MainTheme/theme.typographie';

export const title = (props: { theme: { [key: string]: string } }) => `
  background: linear-gradient(178.18deg, ${props.theme.color} -13.56%, ${
  props.theme.colorGradient ?? props.theme.color
} 158.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: ${props.theme.size ?? typographie.title.fontSize};
  font-family: ${props.theme.font ?? typographie.title.fontFamily};
  font-style: normal;
  font-weight: 700;
`;

export const subTitle = (props: { theme: { [key: string]: string } }) => `
  background: linear-gradient(178.18deg, ${props.theme.color} -13.56%, ${
  props.theme.colorGradient ?? props.theme.color
} 158.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: ${props.theme.size ?? typographie.subtitle.fontSize};
  font-family: ${props.theme.font ?? typographie.subtitle.fontFamily};
  font-style: normal;
  font-weight: 700;
`;

export const paragraph = (props: { theme: { [key: string]: string } }) => `
  background: linear-gradient(178.18deg, ${props.theme.color} -13.56%, ${
  props.theme.colorGradient ?? props.theme.color
} 158.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: ${props.theme.size ?? typographie.paragraph.fontSize};
  font-family: ${props.theme.font ?? typographie.paragraph.fontFamily};
`;

export const graphics = (props: { theme: { [key: string]: string } }) => `
background: linear-gradient(178.18deg, ${props.theme.color} -13.56%, ${
  props.theme.colorGradient ?? props.theme.color
} 158.3%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;
font-size: ${props.theme.size ?? typographie.graphics.fontSize};
font-family: ${props.theme.font ?? typographie.graphics.fontFamily};
font-style: normal;
font-weight: 200;
`;
