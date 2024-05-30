import { MouseEvent, ReactNode } from 'react';
import { ButtonVariant, HexColor, PropsStyle, Width } from '../../Themes/theme.types';

export type StyledContainerProps = {
  isVisible: boolean;
};

export type ContainerProps = {
  delay: number;
  children: React.ReactNode;
  visible: boolean;
};
