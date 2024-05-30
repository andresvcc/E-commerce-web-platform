import styled from 'styled-components';
import { StyledContainerProps } from './Autocomplete.types';

export const AutocompleteInput = styled.input`
  width: 100%;
  border: none;
  padding: 10px;
  font-size: 1rem;
  color: #757575;
  outline: none;
`;

export const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 0.3rem;
  grid-auto-rows: 2.2rem;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`;

export const SuggestionsList = styled.ul`
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  list-style: none;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  width: 100%;
`;

export const SuggestionItem = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #757575;

  & > div {
    margin-bottom: 5px;
  }

  &:hover,
  &.active {
    background-color: #f9632610;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseIcon = styled.span`
  cursor: pointer;

  &::before {
    font-size: 1rem;
    content: '×';
  }

  &:hover::before {
    border-radius: 100%;
    color: red;
  }
`;

export const StyledIcon = styled.i`
  position: absolute;
  right: 0;
  bottom: 0;
  widht: 10rem;
  font-size: 20px;
  padding: 0.5rem;
  color: grey;
`;

export const SelectedValue = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  font-size: 0.7rem;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 2rem;
  background-color: #f9632620;
  color: #333;
  border: 1px solid #f96326;

  &:last-child {
    margin-right: 0;
  }

  span {
    margin-left: 4px;
    font-weight: bold;
  }
`;

export const TruncatedText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledDelayedContainer = styled.div<StyledContainerProps>`
  width: 100%;
  opacity: ${(props) => (props.isVisible ? '0' : '1')};
  transition: opacity 0.25s ease;
`;
