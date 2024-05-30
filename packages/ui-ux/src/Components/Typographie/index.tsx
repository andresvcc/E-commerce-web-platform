import React from 'react';
import styled from 'styled-components';
import { graphics, paragraph, subTitle, title } from './typographie.styles';
import { TypographieProps } from './typographie.types';
import { colors } from '../../Themes/MainTheme/theme.colors';

const Default = styled.p`
  padding: 0px;
  border: 0px;
  margin: 0px;
  text-align: ${(props) => props.theme.align};
  ${(props) => (!props.theme.variant ? paragraph(props) : '')}
  ${(props) => (props.theme.variant === 'paragraph' ? paragraph(props) : '')} 
  ${(props) => (props.theme.variant === 'title' ? title(props) : '')} 
  ${(props) => (props.theme.variant === 'subtitle' ? subTitle(props) : '')}
  ${(props) => (props.theme.variant === 'graphics' ? graphics(props) : '')}
`;

Default.defaultProps = {
  theme: {
    colorGradient: undefined,
    color: colors.default.base.text,
    variant: 'paragraph',
    width: '100%',
    align: 'left',
  },
};

export function Typographie({ children, onClick, ...rest }: TypographieProps) {
  return (
    <Default onClick={onClick} theme={{ ...Default.defaultProps?.theme, ...rest }} {...rest}>
      {children}
    </Default>
  );
}
