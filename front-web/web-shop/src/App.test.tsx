import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import App from './App';

describe('tests Button component', () => {
  test('test props children string', () => {
    const tree = renderer.create(<App />).root;

    const elements = tree.findAllByType('p');
    const title = elements.find(({ props }) => props.children.includes('ceci est a texte de test'));
    expect(title).toBeTruthy();
  });
});
