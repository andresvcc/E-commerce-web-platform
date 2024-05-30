export const base = (props: { theme: { [key: string]: string } }) => `
  :hover {
    opacity: ${props.theme.hoverEffect === 'opacity' ? '0.8' : 1};
  }

  transition: all .2s,box-shadow .08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
`;
