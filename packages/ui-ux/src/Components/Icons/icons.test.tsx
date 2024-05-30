import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import { Icon, iconsList } from './index';

describe('tests Icons component', () => {
  iconsList.forEach((iconName) => {
    test(`test icon ${iconName} rendering`, () => {
      const tree = renderer.create(<Icon name={iconName} palleteFill={['#0F0F0F']} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  test('test clicklable icon', () => {
    let count = 0;

    const root = renderer.create(<Icon name="alert" palleteFill={['#0F0F0F']} onClick={() => count++} />).root;

    const element = root.findByType('div');
    renderer.act(element.props.onClick);
    expect(count === 1).toBe(true);
  });
});
