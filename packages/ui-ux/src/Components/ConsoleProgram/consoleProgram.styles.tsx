import React, { useState, useRef, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from './assets/colors';
import { LogType } from './consoleProgram.types';

export const ConsoleContainer = styled.div`
  background-color: ${colors.backgroundColor};
  color: ${colors.textColor};
  border-radius: 5px;
  overflow-y: hidden;
  height: 100%;
`;

export const MessagesContainer = styled.div`
  background-color: ${colors.messageBackground};
  height: calc(100% - 5rem - 10px);
  overflow-y: auto;
`;

export const InputContainer = styled.div`
  background-color: ${colors.inputBackground};
  padding: 5px;
  border-top: 1px solid ${colors.borderColor};
  height: 2.4rem;
  overflow: hidden;
`;

export const LogItem = styled.div<{ type: LogType }>`
  padding: 0.6rem 0.6rem;
  color: ${({ type }) =>
    type === 'error' ? colors.errorColor : type === 'system' ? colors.systemColor : colors.commentColor};
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  position: relative;
  border-bottom: 1px solid ${colors.borderColor};
`;

export const ConsoleInput = styled.input`
  width: 100%;
  background-color: ${colors.inputBackground};
  color: ${colors.inputTextColor};
  border: none;
  padding: 5px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;

  overflow: hidden;

  &:focus {
    outline: none;
  }
`;

export const ReacMoreButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.buttonColor};
  font-size: 0.7rem;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
`;

export const Title = styled.span`
  font-weight: bold;
`;

export const Toolbar = styled.div`
  background-color: ${colors.messageBackground};
  padding: 5px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.borderColor};
  height: 2.4rem;
  position: relative; // Para que el menú desplegable se posicione en relación con esto
`;
