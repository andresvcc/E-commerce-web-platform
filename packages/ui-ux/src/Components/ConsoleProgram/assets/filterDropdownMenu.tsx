import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '../../Icons';
import { LogType } from '../consoleProgram.types';
import { colors } from './colors';

const FilterButton = styled.button`
  background-color: transparent;
  color: ${colors.buttonColor};
  border: none;
  font-family: 'Courier New', Courier, monospace;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0rem 0.5rem;

  height: 2.5rem;

  transform: translateY(-5px);

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownMenuContainer = styled.div`
  background-color: ${colors.backgroundColor};
  position: fixed;
  border: 1px solid ${colors.borderColor};
  border-radius: 5px;
  padding: 10px;
  z-index: 1;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  color: ${colors.textColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const getColorForLogType = (type: LogType) => {
  switch (type) {
    case 'error':
      return colors.errorColor;
    case 'system':
      return colors.systemColor;
    case 'comment':
      return colors.commentColor;
    case 'info':
      return colors.infoColor;
    default:
      return colors.textColor;
  }
};

const CheckboxContainer = styled.div<{ type: LogType }>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  input[type='checkbox'] {
    appearance: none;
    background-color: ${colors.inputBackground};
    border: 1px solid ${colors.borderColor};
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    position: relative;
    cursor: pointer;

    &:checked {
      background-color: ${({ type }) => getColorForLogType(type)};
      border: none;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background-color: ${colors.backgroundColor};
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  label {
    color: ${({ type }) => getColorForLogType(type)};
    cursor: pointer;
  }
`;

const types: LogType[] = ['error', 'system', 'comment', 'info'];

interface DropdownMenuProps {
  onFilterChange?: (selectedFilters: LogType[]) => void;
}

export const FilterDropdownMenu: React.FC<DropdownMenuProps> = ({ onFilterChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    if (buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top - dropdownRect.height + 6,
        left: rect.left - 13,
      });
    }
  }, [showDropdown, dropdownRef]);

  const handleCheckboxChange = (type: LogType, checked: boolean) => {
    // Aquí puedes manejar cambios en los checkboxes si es necesario.
    // Por ejemplo, puedes usar onFilterChange para notificar a los padres sobre cambios en el filtro.
  };

  return (
    <>
      <FilterButton ref={buttonRef} onClick={toggleDropdown}>
        <Icon name="filter" palleteFill={['#ffffff']} palleteFillHover={['#ababab']} rotate={0} sizeH={18} sizeW={18} />
        <span style={{ position: 'absolute', bottom: '-5px', fontSize: '0.7rem', color: 'white' }}>Filters</span>
      </FilterButton>

      {showDropdown && (
        <DropdownMenuContainer
          ref={dropdownRef}
          style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
        >
          {types.map((logType, index) => (
            <CheckboxContainer key={index} type={logType}>
              <input
                type="checkbox"
                id={logType}
                name={logType}
                onChange={(e) => handleCheckboxChange(logType, e.target.checked)}
              />
              <label htmlFor={logType}>{logType}</label>
            </CheckboxContainer>
          ))}
        </DropdownMenuContainer>
      )}
    </>
  );
};
