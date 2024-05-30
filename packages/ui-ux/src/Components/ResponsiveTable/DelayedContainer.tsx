import React, { FC, useEffect, useState } from 'react';
import { StyledDelayedContainer } from './table.styles';
import { ContainerProps } from './table.types';

export const DelayedContainer: React.FC<ContainerProps> = ({ delay, children, colSpan }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  if (!isVisible) {
    return null;
  }

  return (
    <StyledDelayedContainer isVisible={isVisible} colSpan={colSpan}>
      {children}
    </StyledDelayedContainer>
  );
};
