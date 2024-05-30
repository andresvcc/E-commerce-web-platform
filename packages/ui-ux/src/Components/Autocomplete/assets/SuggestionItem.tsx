/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SuggestionItem as SuggestionItemStyled } from '../Autocomplete.styles';
import { ISuggestion } from '../Autocomplete.types';
import { HighlightMatch } from './HighlightMatch';

export interface ISuggestionItem {
  suggestion: ISuggestion;
  onClick: (param: any) => void;
  isActive: boolean;
  AutocompleteValue: string;
  AutocompleteKey: string;
  orderKey: string;
}

export const SuggestionItem: React.FC<ISuggestionItem> = ({
  suggestion,
  onClick,
  isActive,
  AutocompleteValue,
  AutocompleteKey,
  orderKey,
}) => {
  const suggestionValues = Object.entries(suggestion)
    // .filter(([key, value]) => value.toString().toLowerCase().includes(AutocompleteValue))
    .map(([key, value], index) => (
      <span key={`${index}-label-${orderKey}`}>
        <strong>{key}:</strong>
        &nbsp;
        <span
          style={{
            paddingRight: '0.5rem',
          }}
        >
          <HighlightMatch match={AutocompleteValue}>{`${value}`}</HighlightMatch>
        </span>
      </span>
    ));

  return (
    <SuggestionItemStyled onClick={() => onClick(suggestion)} className={isActive ? 'active' : ''}>
      {suggestionValues}
    </SuggestionItemStyled>
  );
};
