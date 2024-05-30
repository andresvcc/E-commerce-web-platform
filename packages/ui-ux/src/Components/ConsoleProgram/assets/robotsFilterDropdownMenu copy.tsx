import React, { useState, useRef, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import styled from 'styled-components';
import { Icon } from '../../Icons';
import { LogType } from '../consoleProgram.types';
import { colors } from './colors';

const scrollbarStyles = {
  width: '24rem',
  padding: '5px',
  paddingBottom: '1rem',
};

const gridContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
  width: '100%',
};

const renderThumb = ({ style, ...props }: any) => {
  const thumbStyle = {
    backgroundColor: colors.scrollThumb,
    ...style,
  };
  return <div style={thumbStyle} {...props} />;
};

export const CustomDropdownScrollbar: React.FC<any> = ({ children }) => {
  return (
    <Scrollbars style={scrollbarStyles} renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
      <div style={gridContainerStyles}>{children}</div>
    </Scrollbars>
  );
};

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

  height: 2.4rem;

  transform: translateY(-5px);

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownMenuContainer = styled.div`
  width: calc(16rem - 5px);
  height: 100%;
  max-height: 8rem;
  min-height: 4rem;
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
`;

const CheckboxContainer = styled.div`
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
      background-color: white;
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
    color: white;
    cursor: pointer;
  }
`;

const robots = ['Robot 1', 'Robot 2', 'Robot 3', 'Robot 4', 'Robot 5', 'Robot 6', 'Robot 7', 'Robot 8'];

interface RobotsDropdownMenuProps {
  onFilterChange?: (selectedFilters: LogType[]) => void;
}

export const RobotsDropdownMenu: React.FC<RobotsDropdownMenuProps> = ({ onFilterChange }) => {
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
        left: rect.left + 3,
      });
    }
  }, [showDropdown, dropdownRef]);

  const handleCheckboxChange = (robot: string, checked: boolean) => {
    // Aquí puedes manejar cambios en los checkboxes si es necesario.
    // Por ejemplo, puedes usar onFilterChange para notificar a los padres sobre cambios en el filtro.
  };

  return (
    <>
      <FilterButton ref={buttonRef} onClick={toggleDropdown}>
        <Icon
          name="thymio"
          palleteFill={['#455545', '#EAEAEA', '#CECECE']}
          palleteFillHover={['#455545', '#EAEAEA', '#CECECE']}
          rotate={0}
          sizeH={30}
          sizeW={30}
        />
        <span style={{ position: 'absolute', bottom: '-6px', fontSize: '0.7rem', color: 'white' }}>Robots</span>
      </FilterButton>

      {showDropdown && (
        <DropdownMenuContainer
          ref={dropdownRef}
          style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
        >
          <CustomDropdownScrollbar>
            {robots.map((robot, index) => (
              <CheckboxContainer key={index}>
                <input
                  type="checkbox"
                  id={robot}
                  name={robot}
                  onChange={(e) => handleCheckboxChange(robot, e.target.checked)}
                />
                <label htmlFor={robot}>{robot}</label>
              </CheckboxContainer>
            ))}
          </CustomDropdownScrollbar>
        </DropdownMenuContainer>
      )}
    </>
  );
};
