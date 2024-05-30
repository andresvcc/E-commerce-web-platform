import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación para el crecimiento y decrecimiento de los puntos
const growAndShrink = keyframes`
  0%, 80% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  20% {
    transform: scale(1.4);
    opacity: 1;
  }
`;

// Componente del punto individual
const Dot = styled.div<{ delay: number; size: number; speed: number }>`
  background-color: ${(props) => props.color || '#000'};
  width: ${(props) => props.size || 10}px;
  height: ${(props) => props.size || 10}px;
  border-radius: 50%;
  margin: 0 5px;
  display: inline-block;
  animation: ${growAndShrink} ${(props) => 4 - props.speed + 1}s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

// Contenedor para los puntos
const DotsSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dots = ({ theme }: { theme: { color: string; size: number; speed: number } }) => {
  // Propiedades del tema (puedes personalizar estos valores)

  const speed = theme.speed / 100;

  return (
    <DotsSpinner>
      <Dot color={theme.color} size={theme.size} speed={speed} delay={0} />
      <Dot color={theme.color} size={theme.size} speed={speed} delay={0.5} />
      <Dot color={theme.color} size={theme.size} speed={speed} delay={1} />
      <Dot color={theme.color} size={theme.size} speed={speed} delay={1.5} />
    </DotsSpinner>
  );
};

export default Dots;
