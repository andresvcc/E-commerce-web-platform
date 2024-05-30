import React, { ReactNode } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { SpinnerProps } from './spinner.types';

import DualRing from './assets/dualRing.spinner';
import Default from './assets/default.spinner';
import Scan from './assets/scan.spinner';
import Advanced from './assets/advanced.spinner';
import All from './assets/all.spinner';
import Dots from './assets/dots.spinner';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(${(props) => `${props.theme.size / 200 + 0.2}`});
`;

SpinnerContainer.defaultProps = {
  theme: {
    color: '#000',
    size: 50,
    speed: 100,
  },
};

const Spinners: { [key: string]: any } = {
  'dual-ring': DualRing,
  default: Default,
  scan: Scan,
  advanced: Advanced,
  all: All,
  dots: Dots,
};

export const SpinnersList = Object.keys(Spinners);

export function Spinner({
  color = '#000',
  name = 'default',
  size = 50,
  speed = 100,
  style,
  onMouseEnter,
  onMouseLeave,
}: SpinnerProps) {
  if (!Spinners[name]) {
    return <div />;
  }

  const SelectedSpinner = Spinners[name];

  return (
    <SpinnerContainer style={style} theme={{ size }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <SelectedSpinner theme={{ color, speed }} />
    </SpinnerContainer>
  );
}
