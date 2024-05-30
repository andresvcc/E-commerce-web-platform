import { ReactChild, ReactNode } from 'react';
import { PopoverChildrenProps } from '../Popover/types';

export interface TooltipProps {
  /**
   * Tooltip content
   */
  children?: ReactChild | ((props: PopoverChildrenProps) => ReactChild);
  title: string;
}
