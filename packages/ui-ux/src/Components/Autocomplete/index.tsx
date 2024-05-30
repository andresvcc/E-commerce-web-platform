/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, ChangeEvent, KeyboardEvent, ReactNode, useRef, useEffect } from 'react';
import {
  AutocompleteInput,
  InputContainer,
  SuggestionsList,
  StyledIcon,
  SelectedValue,
  Container,
  CloseIcon,
  TruncatedText,
} from './Autocomplete.styles';
import { SuggestionItem } from './assets/SuggestionItem';
import { Popover } from '../Popover';

export interface ISuggestion {
  [key: string]: string | number;
}

export interface IAutocompleteProps {
  suggestions: ISuggestion[];
  AutocompleteKey: string;
  icon?: ReactNode;
  placeholder: string;
}

export interface ISearchIconProps {
  children: ReactNode;
}

const PositionIcon: React.FC<ISearchIconProps> = ({ children }) => {
  return <StyledIcon>{children}</StyledIcon>;
};

const useHover = (): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  React.useEffect(() => {
    const node = hoverRef.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return [isHovered, hoverRef];
};

export const Autocomplete: React.FC<IAutocompleteProps> = ({
  suggestions,
  AutocompleteKey,
  icon,
  placeholder = '',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<ISuggestion[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<ISuggestion[]>([]);
  const [isHovered, hoverRef] = useHover();
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    filterSuggestions(e.target.value);
  };

  const filterSuggestions = (value: string) => {
    const filtered = suggestions.filter(
      (suggestion) =>
        !selectedValues.some((selected) => selected[AutocompleteKey] === suggestion[AutocompleteKey]) &&
        suggestion[AutocompleteKey].toString().toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      filteredSuggestions.length > 0 &&
      activeSuggestion >= 0 &&
      activeSuggestion < filteredSuggestions.length
    ) {
      e.preventDefault();
      selectSuggestion(activeSuggestion);
    } else if (e.key === 'Backspace' && inputValue === '' && selectedValues.length > 0) {
      removeLastSelectedValue();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion((prevActive) => (prevActive > 0 ? prevActive - 1 : filteredSuggestions.length - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion((prevActive) => (prevActive < filteredSuggestions.length - 1 ? prevActive + 1 : 0));
    }
  };

  const selectSuggestion = (index: number) => {
    const selectedSuggestion = filteredSuggestions[index];
    if (selectedSuggestion) {
      setSelectedValues((prevValues) => [...prevValues, selectedSuggestion]);
      setInputValue('');
    }
  };

  const removeLastSelectedValue = () => {
    setSelectedValues((prevValues) => prevValues.slice(0, -1));
  };

  const removeSelectedValue = (index: number) => {
    setSelectedValues((prevValues) => {
      if (index < 0 || index >= prevValues.length) {
        throw new Error('Índice fuera de rango');
      }

      const updatedValues = [...prevValues];
      updatedValues.splice(index, 1);

      return updatedValues;
    });
  };

  useEffect(() => {
    const handleFocus = () => {
      setInputFocus(true);
      console.log('focus');
    };

    const handleBlur = () => {
      setInputFocus(false);
      console.log('blur');
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHovered) {
      setFilteredSuggestions([]);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [isHovered]);

  const handleSuggestionClick = (index: number) => {
    selectSuggestion(index);
  };

  useEffect(() => {
    if (inputFocus || isHovered) {
      filterSuggestions(inputValue);
    }
  }, [selectedValues]);

  return (
    <div ref={hoverRef}>
      <div
        style={{
          width: '',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: inputFocus ? '2px solid #ababab' : '2px solid #e5e5e5',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          position: 'relative',
          transition: 'all 0.2s ease-in-out',
        }}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
            filterSuggestions(inputValue);
          }
        }}
      >
        <Container>
          {selectedValues.map((value, index) => (
            <div key={index}>
              <Popover
                fitMaxHeightToBounds
                fitMaxWidthToBounds
                considerTriggerMotion
                content={
                  <div style={{ fontSize: '0.7rem', margin: 0 }}>
                    {Object.entries(value).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}: </strong>
                        {value}
                      </div>
                    ))}
                  </div>
                }
              >
                <SelectedValue>
                  <TruncatedText>{value[AutocompleteKey]}</TruncatedText>
                  <CloseIcon onClick={() => removeSelectedValue(index)} />
                </SelectedValue>
              </Popover>
            </div>
          ))}
          <InputContainer>
            <AutocompleteInput
              ref={inputRef}
              type="text"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={inputValue}
              placeholder={placeholder}
            />
          </InputContainer>
        </Container>
        <PositionIcon>{icon}</PositionIcon>
      </div>
      <SuggestionsList>
        {filteredSuggestions.map((suggestion, index) => (
          <SuggestionItem
            key={`${index}`}
            orderKey={`${index}`}
            suggestion={suggestion}
            onClick={() => handleSuggestionClick(index)}
            isActive={index === activeSuggestion}
            AutocompleteValue={inputValue}
            AutocompleteKey={AutocompleteKey}
          />
        ))}
      </SuggestionsList>
    </div>
  );
};
