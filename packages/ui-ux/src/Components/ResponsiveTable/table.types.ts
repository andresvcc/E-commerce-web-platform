import { MouseEvent, ReactNode } from 'react';
import { ButtonVariant, HexColor, PropsStyle, Width } from '../../Themes/theme.types';

export type Alignment = 'left' | 'right' | 'center';

export interface Column {
  header: string | React.ReactNode;
  align?: Alignment;
  width?: string;
}

export interface Cell {
  value: string | React.ReactNode;
  color?: string;
  align?: Alignment;
}

export interface Row {
  cells: Cell[];
  bgcolor?: string;
  collapseComponent?: React.ReactNode;
}

export interface TableProps {
  columns: Column[];
  rows: Row[];
}

export interface Sizes {
  [key: string]: {
    min?: number;
    max?: number;
  };
}

export type ContainerProps = {
  delay: number;
  children: React.ReactNode;
  colSpan?: number;
};

export type StyledContainerProps = {
  isVisible: boolean;
};
