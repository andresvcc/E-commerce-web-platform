import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

type Orientation = 'horizontal' | 'vertical';

type ResizablePaneProps = {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
  orientation?: Orientation;
  minPosition?: number; // posición mínima de la barra de redimensionamiento
  maxPosition?: number; // posición máxima de la barra de redimensionamiento
  initialPosition?: number; // posición inicial de la barra de redimensionamiento
  onChange?: (newPosition: number) => void; // función que se ejecuta cuando cambia la posición de la barra de redimensionamiento
};

const PaneContainer = styled.div<{ orientation: Orientation }>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: ${({ orientation }) => (orientation === 'horizontal' ? 'row' : 'column')};
  position: relative;
  align-items: stretch;
  justify-content: stretch;
`;

const Pane = styled.div.attrs<{ position: number }>((props) => ({
  style: {
    flexBasis: `${props.position}%`,
  },
}))<{ position: number }>`
  overflow: hidden;
  height: auto;
  padding: 0.1rem 0.1rem;
`;

const ResizeBar = styled.div<{ orientation: Orientation }>`
  cursor: ${({ orientation }) => (orientation === 'horizontal' ? 'ew-resize' : 'ns-resize')};
  background: #d9e3f2;
  width: ${({ orientation }) => (orientation === 'horizontal' ? '0.2rem' : '90%')};
  height: ${({ orientation }) => (orientation === 'horizontal' ? '90%' : '0.2rem')};
  margin: 0rem 0rem;
  z-index: 1;
  transition: all 0.2s ease-in;

  margin: ${({ orientation }) => (orientation === 'horizontal' ? '0.1rem 0.1rem' : '0.2rem 0.1rem 0.1rem 0.1rem')};

  border-radius: 0.2rem;

  &:hover {
    background: #e4cafc;
  }
`;

function useDebounce(value: number, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const ResizablePane: React.FC<ResizablePaneProps> = ({
  leftChild,
  rightChild,
  orientation = 'horizontal',
  minPosition = 20,
  maxPosition = 80,
  initialPosition = 50, // Valor por defecto
  onChange = () => {},
}) => {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedPosition = useDebounce(position, 1000); // 300ms de retardo, puedes ajustar según lo necesites

  const handleResize = (event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition;
      if (orientation === 'horizontal') {
        newPosition = ((event.clientX - rect.left) / rect.width) * 100;
      } else {
        newPosition = ((event.clientY - rect.top) / rect.height) * 100;
      }

      const minPosition2 = 100 - maxPosition; // Cambio de maxPosition2 a minPosition2

      if (newPosition < minPosition) {
        newPosition = minPosition;
      }

      if (newPosition > maxPosition) {
        // Cambio de maxPosition2 a minPosition2
        newPosition = maxPosition;
      }

      if (newPosition > 100) {
        // Cambio de maxPosition2 a 100
        newPosition = 100;
      }

      setPosition(newPosition);
    }
  };

  const stopResize = () => {
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  const startResize = (event: React.MouseEvent) => {
    event.stopPropagation();
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  useEffect(() => {
    if (onChange) {
      onChange(debouncedPosition);
    }
  }, [debouncedPosition, onChange]);

  return (
    <PaneContainer orientation={orientation} ref={containerRef}>
      <Pane position={position}>{leftChild}</Pane>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResizeBar orientation={orientation} onMouseDown={startResize} />
      </div>
      <Pane position={100 - position}>{rightChild}</Pane>
    </PaneContainer>
  );
};

export default ResizablePane;
