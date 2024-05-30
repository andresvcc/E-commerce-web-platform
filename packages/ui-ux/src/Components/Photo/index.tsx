import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { base } from './photo.styles';
import { HexColor, ObjectFit, Padding, PropsStyle, Width, Height } from '../../Themes/theme.types';
import { PhotoProps } from './photo.types';
import logoMobsya from './assets/logo-mobsya.png';
import usingBlockly from './assets/using-blockly.jpeg';
import usingScratch from './assets/using-scratch.jpeg';
import usingStudio from './assets/using-studio.jpeg';
import usingVpl from './assets/using-vpl.jpeg';
import usingThonny from './assets/using-thonny.jpeg';

const photos: { [key: string]: any } = {
  'logo-mobsya': logoMobsya,
  'using-blockly': usingBlockly,
  'using-scratch': usingScratch,
  'using-studio': usingStudio,
  'using-vpl': usingVpl,
  'using-thonny': usingThonny,
};

const Default = styled.img`
  width: ${(props) => props.theme.width};
  height: ${(props) => props.theme.height};
  object-fit: ${(props) => props.theme.objectFit};
  background-color: ${(props) => props.theme.bgcolor};
  transition: ${(props) => (props.theme.hoverEffect === 'opacity' ? 'opacity 0.3s' : 'none')};
  opacity: ${(props) => (props.theme.hoverEffect === 'opacity' ? '1' : 'none')};

  &:hover {
    opacity: ${(props) => (props.theme.hoverEffect === 'opacity' ? '0.8' : 'none')};
  }
`;

Default.defaultProps = {
  theme: {
    src: '',
    bgcolor: '',
    hoverEffect: 'none',
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    paddingX: '5px',
    paddingY: '5px',
  },
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.theme.bgcolor};
  padding-top: ${(props) => props.theme.paddingY};
  padding-bottom: ${(props) => props.theme.paddingY};
  padding-left: ${(props) => props.theme.paddingX};
  padding-right: ${(props) => props.theme.paddingX};
  ${(props) => base(props)}
`;

export function Photo({
  src,
  alt,
  onClick,
  style,
  bgcolor,
  width,
  height,
  objectFit,
  paddingY,
  paddingX,
  hoverEffect,
}: PhotoProps) {
  return (
    <Container
      theme={{
        bgcolor,
        paddingY,
        paddingX,
      }}
    >
      <Default
        src={photos[src]}
        alt={alt}
        onClick={onClick}
        style={style}
        theme={{
          bgcolor,
          width,
          height,
          objectFit,
          hoverEffect,
        }}
      />
      <h5>{src}</h5>
    </Container>
  );
}
