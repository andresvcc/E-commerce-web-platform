import { typographie } from '../../Themes/MainTheme/theme.typographie';
import styled from 'styled-components';
import { colors } from '../../Themes/MainTheme/theme.colors';

export const container = (props: { theme: { [key: string]: string } }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.5);
`;

export const containedBase = (props: { theme: { [key: string]: string } }) => `
  border-radius: 50%;
  border: none;
  background-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  background-color: #32BEA6;
  position: relative;
  `;

export const backgroundContainer = (props: { theme: { [key: string]: string } }) => `
  position: absolute;
`;
