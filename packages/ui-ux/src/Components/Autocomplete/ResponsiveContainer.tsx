import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type BoxSizing = 'border-box' | 'content-box' | 'inherit' | 'initial' | 'unset';

export interface IResponsiveContainerProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ResponsiveContainer: React.FC<IResponsiveContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const columnWidth = 300; // Ancho mínimo deseado de cada columna
        const newColumns = Math.max(1, Math.floor(containerWidth / columnWidth));
        setColumns(newColumns);
      }
    };

    handleResize(); // Ajustar las columnas inicialmente

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columnStyles: React.CSSProperties = {
    width: `${100 / columns}%`,
    minWidth: '0',
    boxSizing: 'border-box' as BoxSizing,
    paddingRight: '16px',
    marginBottom: '16px',
  };

  return (
    <Container ref={containerRef}>
      {React.Children.map(children, (child, index) => (
        <div key={index} style={columnStyles}>
          {child}
        </div>
      ))}
    </Container>
  );
};
