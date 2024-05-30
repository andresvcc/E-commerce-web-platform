import { typographie } from '../../Themes/MainTheme/theme.typographie';

export const containedBase = (props: { theme: { [key: string]: string } }) => `
  align-items: center;
  appearance: none;
  background-color: ${props.theme.bgcolor};
  background-image: linear-gradient(45deg, ${props.theme.bgcolor}, ${
  props.theme.bgGradient ?? props.theme.bgcolor
} 99%);
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 8px;
  border-width: 0;
  border-style: none;
  box-shadow: none;
  box-sizing: border-box;
  color: ${props.theme.textcolor};
  cursor: pointer;
  display: inline-flex;
  font-family: ${typographie.button.fontFamily};
  font-size: 1rem;
  font-weight: 500;
  height: auto;
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

  border-radius: ${props.theme.rounded ? '25px' : '8px'};

  transition: all .2s,box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: ${props.theme.width ?? '100%'};
  height: ${props.theme.height ?? 'auto'};

  :disabled {
    cursor: default;
  }

  :active {
    outline: none;
    opacity: 0.7;
  }

  :hover {
    background-image: linear-gradient(15deg, ${props.theme.bgcolor}, ${
  props.theme.bgGradient ?? props.theme.bgcolor
} 99%);
  }

  :focus {
    outline: none;
  }

  focus:not(:active) {
    box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
  }
  

`;

export const outlinedBase = (props: { theme: { [key: string]: string } }) => `
  background-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-image: linear-gradient(45deg, ${props.theme.bgcolor}, ${props.theme.bgGradient ?? props.theme.bgcolor}) 1;
  box-shadow: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  height: auto;
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

  background: -webkit-linear-gradient(45deg, ${props.theme.bgcolor}, ${props.theme.bgGradient ?? props.theme.bgcolor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  :disabled {
    cursor: default;
  }

  :active {
    opacity: 0.7;
  }

  :hover {
 
  }

  :focus {
    outline: none;
  }

  focus:not(:active) {
    box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
  }transition: all .2s,box-shadow .08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
  }
`;

export const textBase = (props: { theme: { [key: string]: string } }) => `
background-color: transparent;
border-style: none;
border-width: 5px;
box-shadow: none;
box-sizing: border-box;
cursor: pointer;
display: inline-flex;
font-family: CircularStd,sans-serif;
font-size: 1rem;
font-weight: 500;
height: auto;
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

background: -webkit-linear-gradient(1deg, ${props.theme.bgcolor}, ${props.theme.bgGradient ?? props.theme.bgcolor});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

:disabled {
  cursor: default;
}

:active {
  -webkit-text-fill-color: ${props.theme.bgcolor};
}

:hover {
  opacity: 0.7;
}

:focus {
  outline: none;
}

focus:not(:active) {
  box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
}transition: all .2s,box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
}
`;
