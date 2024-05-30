import { typographie } from '../../Themes/MainTheme/theme.typographie';

export const containedBase = (props: { theme: { [key: string]: string } }) => `
  align-items: center;
  appearance: none;
  background-color: ${props.theme.bgcolor};
  background-image: linear-gradient(45deg, ${props.theme.bgcolor}, ${
  props.theme.bgGradient ?? props.theme.bgcolor
} 99%);
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 0px 0px 8px 8px;
  border-width: 0;
  border-style: none;
  box-shadow: none;
  box-sizing: border-box;
  color: ${props.theme.textcolor};
  display: inline-flex;
  font-family: ${typographie.button.fontFamily};
  font-size: 1rem;
  font-weight: 500;
  height: ${props.theme.height};
  min-height: 3rem;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color .2s,background-position .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
`;
