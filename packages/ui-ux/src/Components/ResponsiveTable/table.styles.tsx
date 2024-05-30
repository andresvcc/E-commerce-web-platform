import styled from 'styled-components';
import { Alignment, StyledContainerProps } from './table.types';

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Header = styled.th<{ textAlign?: Alignment; width?: string }>`
  text-align: ${(props) => props.textAlign || 'left'};
  width: ${(props) => props.width};

  padding: 16px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  font-size: 0.875rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  letter-spacing: 0.01071em;

  color: rgba(0, 0, 0, 0.64);
  font-weight: 800;
  line-height: 1.5rem;
`;

export const Thead = styled.thead`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

export const Data = styled.td<{ textAlign?: Alignment; color?: string; bgcolor?: string }>`
  text-align: ${(props) => props.textAlign || 'left'};
  background-color: ${({ bgcolor, color }) => color ?? bgcolor};
  padding: 16px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  font-size: 0.875rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: rgba(0, 0, 0, 0.64);
`;

export const CollapsedRow = styled.tr`
  height: ${(props) => (props.theme.visible ? `${props.theme.height}px` : '0px')};
  transition: height 0.3s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

export const StyledDelayedContainer = styled.td<StyledContainerProps>`
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  transition: opacity 0.5s ease-in-out;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;
