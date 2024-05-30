import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import { NavBar } from './index';

describe('tests NavBar component', () => {
  test('test props children string', () => {
    const tree = renderer.create(<NavBar>Title</NavBar>).root;

    const element = tree;
    expect(element.props.children.includes('Title')).toBe(true);
  });

  test('test props children reactNode', () => {
    const tree = renderer
      .create(
        <NavBar>
          <p>Title</p>
        </NavBar>,
      )
      .toTree();

    const element = tree?.props.children;
    expect(element.props.children.includes('Title')).toBe(true);
  });
});
