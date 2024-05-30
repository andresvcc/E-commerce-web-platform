import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../Icons';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;

const SearchContainer = styled.div`
  background-color: #333842;
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 50%;
  min-width: 200px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  background-color: #333842;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 16px;
  padding: 4px 8px 4px 30px;
  border-radius: 4px;
  transition: background-color 0.3s;

  width: 100%;

  &:focus {
  }

  &::placeholder {
    color: #848889;
  }
`;

type SearchBarProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search', onChange }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <Icon name="search" sizeH={20} sizeW={20} palleteFill={['#848889']} style={{ position: 'absolute' }} />
        <SearchInput type="text" value={value} onChange={handleInputChange} placeholder={placeholder} />
      </SearchContainer>
    </Container>
  );
};

export default SearchBar;
