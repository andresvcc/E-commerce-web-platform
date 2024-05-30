import React from 'react';
import { StyledSearchBar } from './searchBar.styles';
import { Icon } from '../Icons';
import { Autocomplete } from '../Autocomplete';

export interface SearchBarProps {
  suggestions: { [key: string]: string | number }[];
  AutocompleteKeys: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ suggestions, AutocompleteKeys }) => {
  return (
    <StyledSearchBar>
      <Autocomplete
        suggestions={suggestions}
        AutocompleteKey={AutocompleteKeys}
        icon={<Icon name="search" sizeW={30} sizeH={30} palleteFill={['#757575']} />}
        placeholder="Search..."
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
