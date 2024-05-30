import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import App from '.';

describe('tests Button component', () => {
  test('test props children string', () => {
    const tree = renderer.create(<App />).root;

    const element = tree.findByType('h2');
    expect(element.props.children.includes('TEST thymio suite v3')).toBe(true);
  });
});
