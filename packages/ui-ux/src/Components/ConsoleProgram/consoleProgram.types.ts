import { MouseEvent, ReactNode } from 'react';
import { ButtonVariant, HexColor, PropsStyle, Width } from '../../Themes/theme.types';
import { SvgPallette } from '../Icons/icons.types';
import { ScrollbarProps } from 'react-custom-scrollbars-2';

export type LogType = 'error' | 'system' | 'comment' | 'info';

export const MessagesTypes: LogType[] = ['error', 'system', 'comment', 'info'];

export interface Log {
  type: LogType;
  message: string;
  line?: number;
  more?: string;
}

export interface ConsoleProps {
  logs: Log[];
}

export interface CustomScrollbarProps extends ScrollbarProps {
  // Aquí puedes agregar propiedades adicionales si las necesitas
}
