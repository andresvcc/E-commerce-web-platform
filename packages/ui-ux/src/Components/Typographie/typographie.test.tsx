import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import { Typographie } from './index';

describe('tests Typographie component', () => {
  test('test props children string', () => {
    const tree = renderer.create(<Typographie>Title</Typographie>).root;

    const element = tree;
    expect(element.props.children.includes('Title')).toBe(true);
  });

  test('test props children reactNode', () => {
    const tree = renderer
      .create(
        <Typographie>
          <p>Title</p>
        </Typographie>,
      )
      .toTree();

    const element = tree?.props.children;
    expect(element.props.children.includes('Title')).toBe(true);
  });

  test('test props onClick', () => {
    let count = 0;

    const tree = renderer.create(<Typographie onClick={() => count++}>Title</Typographie>).root;

    const element = tree.findByType('p');
    renderer.act(element.props.onClick);
    expect(count === 1).toBe(true);
  });
});
