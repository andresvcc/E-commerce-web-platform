import React from 'react';
import styled, { keyframes, StyledComponent } from 'styled-components';
import { Icon } from '../../Icons';
import { SpinnerProps } from '../spinner.types';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  background-color: #0000;
  animation: ${rotateAnimation} ${(props) => 80 / props.theme.speed}s linear infinite;
`;

const Default = ({ theme: { speed, size = 50, color = '#000' } }: { theme: SpinnerProps }) => {
  return (
    <Container theme={{ speed }}>
      <Icon
        name="advanced"
        palleteFill={[color]}
        palleteFillHover={[color]}
        rotate={0}
        sizeH={size}
        sizeW={size}
        bgRound
      />
    </Container>
  );
};

export default Default;
