import React from 'react';
import styled from 'styled-components';

export interface IHighlightMatchProps {
  match: string;
  children: string;
}

export const Highlight = styled.span`
  color: red;
`;

export const HighlightMatch: React.FC<IHighlightMatchProps> = ({ match, children }) => {
  const regex = new RegExp(`(${match})`, 'gi');
  const parts = children.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === match.toLowerCase() ? <Highlight key={i}>{part}</Highlight> : part,
      )}
    </>
  );
};
