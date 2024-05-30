import React, { useState, useRef, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { colors } from './assets/colors';
import { MessagesTypes, LogType, ConsoleProps, CustomScrollbarProps } from './consoleProgram.types';
import {
  ConsoleContainer,
  ConsoleInput,
  InputContainer,
  LogItem,
  MessagesContainer,
  ReacMoreButton,
  Title,
  Toolbar,
} from './consoleProgram.styles';
import { FilterDropdownMenu } from './assets/filterDropdownMenu';
import { RobotsDropdownMenu } from './assets/robotsFilterDropdownMenu copy';
import { CustomScrollbar } from './assets/customScrollbar';
import SearchBar from './assets/searchBar';

export const ConsoleProgram: React.FC<ConsoleProps> = ({ logs }: ConsoleProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log(inputValue);
      setInputValue('');
    }
  };

  return (
    <ConsoleContainer>
      <Toolbar>
        <FilterDropdownMenu onFilterChange={(selectedFilters) => console.log(selectedFilters)} />
        <RobotsDropdownMenu onFilterChange={(selectedFilters) => console.log(selectedFilters)} />
        <SearchBar />
      </Toolbar>
      <MessagesContainer>
        <CustomScrollbar>
          {logs.map((log, index) => (
            <LogItem key={index} type={log.type}>
              <Title>{`${log.type} ${log.line ? `line ${log.line}` : ''}:`.toUpperCase()}</Title>
              &nbsp;
              {log.message}
              &nbsp;
              {log.more && <ReacMoreButton>{'[read more]'}</ReacMoreButton>}
            </LogItem>
          ))}
        </CustomScrollbar>
      </MessagesContainer>
      <InputContainer>
        <ConsoleInput
          placeholder="Type your command..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
      </InputContainer>
    </ConsoleContainer>
  );
};
